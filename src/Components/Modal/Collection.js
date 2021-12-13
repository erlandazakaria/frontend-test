import { useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";

import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';

import { useLoading } from "../../Contexts/Loading";
import { useToast } from "../../Contexts/Toast";
import { GET_COLLECTIONS, NEW_COLLECTION, ADD_TO_COLLECTION } from "../../Queries/Collection";

const CollectionModal = ({setModal, restaurant}) => {
  const [ text, setText ] = useState("");
  const { openLoading, closeLoading } = useLoading();
  const { openToast } = useToast();
  const [ loadCollections, { data, refetch }] = useLazyQuery(GET_COLLECTIONS, {fetchPolicy: "network-only"});
  const [ newCollection ] = useMutation(NEW_COLLECTION, {
    onError: () => {
      openToast("Error Occurred!");
      closeLoading();
    },
    onCompleted: (val) => {
      refetch();
      openToast(val.newCollection.message);
      closeLoading();
    }
  });
  const [ addToCollection ] = useMutation(ADD_TO_COLLECTION, {
    onError: () => {
      openToast("Error Occurred!");
      closeLoading();
    },
    onCompleted: (val) => {
      refetch();
      openToast(val.addToCollection.message);
      closeLoading();
    }
  });  

  useEffect(() => {
    loadCollections()
  // eslint-disable-next-line
  }, [])

  const onClose = () => {
    setModal(null)
  }

  const newCollectionHandler = () => {
    if(text.length > 0) {
      openLoading(true);
      newCollection({variables: {name: text, id_restaurant: restaurant}});
    }
  }

  const addToCollectionHandler = (id_collection) => {
      openLoading(true);
      addToCollection({variables: {id_collection, id_restaurant: restaurant}});
  }

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      style={{position: "absolute", height: '100vh', width: '100vw', top: 0, left: 0}}
      open={true}
      onClick={() => {}}
    >
      <Box 
        style={{width: 500, height: 525, padding: 20, backgroundColor: "white", position: "relative"}} 
        sx={{zIndex: (theme) => theme.zIndex.drawer + 2}}
      >
        <Box 
          style={{width: 20, height: 20, position: "absolute", right: 10, top: 5, color: "black"}}
          onClick={onClose}
        >
          <CancelPresentationIcon />
        </Box>
        <Typography variant="body1" color="primary">My Collections</Typography>
        <Divider style={{marginBottom: 16, marginTop: 8}} />
        {data && data.getCollections && data.getCollections.length > 0 && data.getCollections.map(collection => (
          <Box marginTop={1} key={`collection-${collection._id}`} display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
            <Typography variant="body1" color="primary">{collection.name}</Typography>
            <Button 
              variant="contained" 
              color="secondary" 
              size="small" 
              onClick={() => addToCollectionHandler(collection._id)}
            >Add</Button>
          </Box>
        ))}
        {!data || data.getCollections.length === 0 ? 
          <Typography key={`collection-null`} variant="body1" color="primary">No Collection Found</Typography>
        : null}
        <Box display="flex" flexDirection="row" justifyContent="center" marginTop={4}>
          <TextField size="small" value={text} onChange={e => setText(e.target.value)} />
          <Button
            variant="contained" 
            color="secondary" 
            size="small" 
            onClick={newCollectionHandler}
          >Create New</Button>
        </Box>
      </Box>
    </Backdrop>
  );
}

export default CollectionModal;
