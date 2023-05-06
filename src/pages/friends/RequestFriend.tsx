import react, { useEffect, useState } from 'react';
import {View, ScrollView} from 'react-native'
import { withTheme, useTheme } from 'react-native-paper';
import { useMutation, useQuery } from '@apollo/client';
import { GET_REQUEST_LIST, GET_ALL_FRIENDS } from '@root/graphql/queries/friend.query';
import RequestFriendCard from '@root/components/requestFriendCard/RequestFriendCard';
import { IRequest } from '@root/shared/interfaces/friend.interface';
import { get } from 'lodash';
interface RequestFriendProps{
  currentUserID: string
}
const useGetList = (data: any, loading: boolean) => {
  const [list, setList] = useState([]);
  useEffect(() => {
      if (!loading && data) {
          setList(data);
      }
  }, [data, loading]);
  return get(list, 'friends', []);
};
const RequestFriend: React.FC<RequestFriendProps> = (props) => {
  const {currentUserID} = props
  const { data, loading, error } = useQuery(GET_REQUEST_LIST, {
    variables: { page: 1, limit: 50, confirmed: false, receiver: currentUserID },
  });
  const list = useGetList(data, loading)
  return(
    <ScrollView contentContainerStyle={{flexGrow : 1, alignItems : 'center'}}>
      {list &&
        list.map((requester: IRequest, index: number) => (
          <RequestFriendCard key={index} requester={requester} userId={currentUserID}/>
        ))
      }
          
    </ScrollView>  
  )
}
export default RequestFriend