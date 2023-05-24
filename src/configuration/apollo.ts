import { ApolloClient, InMemoryCache, from, fromPromise, concat } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { RetryLink } from '@apollo/client/link/retry';
import { endpoint } from './endpoint'; 
import api from '@root/shared/services/api/api';
import { LocalStoreName } from '@root/shared/enums/local-store.enum';
import createUploadLink from 'apollo-upload-client/public/createUploadLink.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate } from '@root/navigation/navigation-helper';
import { setContext } from 'apollo-link-context';

const authMiddleware = setContext(async (_, { headers }) => {
    const token = await AsyncStorage.getItem(LocalStoreName.TOKEN);
    console.log("TOken: ", token);
    
    return {
        headers: {
            ...headers,
            Authorization: `Bearer ${token || null}`,
        },
    };
});

const retryLink = new RetryLink({
    delay: {
        initial: 300, // 300ms initial delay
        max: Infinity, // Don't give up
        jitter: true, // .With the jitter option enabled, delays are randomized anywhere between 0ms (instant), and 2x the configured delay. This way you get the same result on average, but with random delays.
    },
    attempts: {
        max: 5, // Retry up to 5 times
        retryIf: (error, _operation) => !!error,
    },
});

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
        for (let err of graphQLErrors) {
            switch (err.extensions.code) {
                // Apollo Server sets code to UNAUTHENTICATED
                // when an AuthenticationError is thrown in a resolver
                case 'UNAUTHENTICATED':
                    // Modify the operation context with a new token
                    return fromPromise(
                        getNewToken().catch((error) => {
                            // Handle token refresh errors e.g clear stored tokens, redirect to login, ...
                            return;
                        })
                    )
                        .filter((value) => Boolean(value))
                        .flatMap((accessToken) => {
                            const oldHeaders = operation.getContext().headers;
                            // modify the operation context with a new token
                            operation.setContext({
                                headers: {
                                    ...oldHeaders,
                                    Authorization: `Bearer ${accessToken}`,
                                },
                            });

                            // retry the request, returning the new observable
                            return forward(operation);
                        });
            }
        }
    }

    // To retry on network errors, we recommend the RetryLink
    // instead of the onError link. This just logs the error.
    if (networkError) {
        console.log(`[Network error]: ${networkError}`);
    }
});

const uploadLink = createUploadLink({
    uri: `${endpoint.api}/graphql`
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: concat(authMiddleware, from([errorLink, retryLink, uploadLink])),
});

const getNewToken = async () => {
    try {
        const result = await api.post(`auth/retrieve-token`, {
            refreshToken: await AsyncStorage.getItem(LocalStoreName.REFRESH_TOKEN),
        });
        if (!result.data.token) {
            await AsyncStorage.setItem(LocalStoreName.REFRESH_TOKEN, '');
            await AsyncStorage.setItem(LocalStoreName.TOKEN, '');
            navigate('LOGIN', null);
            return;
        } else {
            await AsyncStorage.setItem(LocalStoreName.TOKEN, result.data.token);
            await AsyncStorage.setItem(
                LocalStoreName.REFRESH_TOKEN,
                result.data.refreshToken || ''
            );

            // retry the request, returning the new observable
            return result.data.token;
        }
    } catch (error) {
        return;
    }
};

export { client };
