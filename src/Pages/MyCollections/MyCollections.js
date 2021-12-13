import { useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { useLoading } from "../../Contexts/Loading";
import { useToast } from "../../Contexts/Toast";
import { RenameCollection } from "../../Components/Modal";
import { GET_COLLECTIONS, DELETE_FROM_COLLECTION, RENAME_COLLECTION, DELETE_COLLECTION } from "../../Queries/Collection";

const MyCollections = () => {
  const { openLoading, closeLoading } = useLoading();
  const { openToast } = useToast();
  const [ collections, setCollections ] = useState([]);
  const [ modal, setModal ] = useState(null);
  const [ loadCollections, { data, refetch }] = useLazyQuery(GET_COLLECTIONS, {fetchPolicy: "network-only"});

  const [ deleteFromCollection ] = useMutation(DELETE_FROM_COLLECTION, {
    onError: () => {
      openToast("Error Occurred!");
      closeLoading();
    },
    onCompleted: (val) => {
      refetch();
      openToast(val.deleteFromCollection.message);
      closeLoading();
    }
  });
  const [ renameCollection ] = useMutation(RENAME_COLLECTION, {
    onError: () => {
      openToast("Error Occurred!");
      closeLoading();
    },
    onCompleted: (val) => {
      refetch();
      openToast(val.renameCollection.message);
      closeLoading();
    }
  });
  const [ deleteCollection ] = useMutation(DELETE_COLLECTION, {
    onError: () => {
      openToast("Error Occurred!");
      closeLoading();
    },
    onCompleted: (val) => {
      refetch();
      openToast(val.deleteCollection.message);
      closeLoading();
    }
  });

  useEffect(() => {
    loadCollections();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if(data && data.getCollections) {
      setCollections(data.getCollections)
    }
  }, [data])

  const deleteFromCollHandler = (id_collection, id_restaurant) => {
    openLoading(true);
    deleteFromCollection({variables: {id_collection, id_restaurant}});
  }

  const renameCollHandler = (id_collection, name) => {
    openLoading(true);
    renameCollection({variables: {id_collection, name}});
  }
  
  const deleteCollHandler = (id_collection) => {
    openLoading(true);
    deleteCollection({variables: {id_collection}});
  }

  return (
    <Container maxWidth={false} style={{height: "100%", textAlign: "center"}}>
      {modal ? <RenameCollection modal={modal} setModal={setModal} handler={renameCollHandler} /> : null}
      <Grid container justifyContent="center" alignItems="center">
        <Grid item lg={12}>
          <Typography variant="h4" fontWeight="bold" component="div">My Collections</Typography>
        </Grid>
        <Grid item xs={12} marginBottom={4}>
          <Grid container justifyContent="center" alignItems="center" marginTop={0} spacing={4}>
            {collections.map(collection => (
              <Grid key={collection._id} item xs={12} md={4} lg={3}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" fontWeight="bold" component="div">
                      {collection.name}
                    </Typography>
                    <Box textAlign="left" marginTop={2} paddingLeft={2} paddingRight={2}>
                      <Typography variant="body1">Restaurants</Typography>
                      {collection.restaurants && collection.restaurants.map(resto => (
                        <Box key={`${collection._id}-${resto._id}`} display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
                          <Typography variant="body2" fontWeight="bold">{resto.name}</Typography>
                          <Button size="small" variant="text" onClick={() => deleteFromCollHandler(collection._id, resto._id)}>Delete</Button>
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                  <Box textAlign="right" paddingRight={2} paddingBottom={2}>
                    <Button 
                      variant="contained" 
                      color="secondary" 
                      size="small" 
                      style={{marginRight: 8}}
                      onClick={() => setModal(collection._id)}
                    >Rename</Button>
                    <Button 
                      variant="contained" 
                      color="secondary" 
                      size="small" 
                      onClick={() => deleteCollHandler(collection._id)}
                    >Delete Collection</Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default MyCollections;
