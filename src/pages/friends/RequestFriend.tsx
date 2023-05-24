import react, { useEffect, useState } from 'react';
import {View, ScrollView} from 'react-native'
import { withTheme, useTheme } from 'react-native-paper';
import { useMutation, useQuery } from '@apollo/client';
import { GET_REQUEST_LIST, GET_ALL_FRIENDS } from '@root/graphql/queries/friend.query';
import RequestFriendCard from '@root/components/requestFriendCard/RequestFriendCard';
import { IRequest } from '@root/shared/interfaces/friend.interface';
import { get } from 'lodash';
import reactotron from 'reactotron-react-native';
interface RequestFriendProps{
  currentUserID: string
}

const RequestFriend: React.FC<RequestFriendProps> = (props) => {
  const {currentUserID} = props
  const { data, loading, error, refetch } = useQuery(GET_REQUEST_LIST, {
    variables: { page: 1, limit: 1, confirmed: false, receiver: currentUserID },
  });
  const [isUpdated, setIsUpdated] = useState(false)
  const [pendingList, setPendingList] = useState([]);
  
  useEffect(() => {
    refetch();
    setIsUpdated(false)

  }, [isUpdated])
  useEffect(() => {
    if(data)
    {
      setPendingList(data.friends)
    }
  }, [data])
  return(
    <ScrollView contentContainerStyle={{flexGrow : 1, alignItems : 'center'}}>
      {pendingList &&
        pendingList.map((requester: IRequest, index: number) => (
          <RequestFriendCard key={index} setIsUpdated={setIsUpdated} requester={requester} userId={currentUserID}/>
        ))
      }
          
    </ScrollView>  
  )
}
export default RequestFriend