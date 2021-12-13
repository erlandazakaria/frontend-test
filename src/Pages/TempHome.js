import { useEffect, useState } from "react";
import moment from "moment";
import _ from "lodash";
import { useHistory } from "react-router-dom";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { CollectionModal } from "../Components/Modal";
import { useRestaurant } from "../Contexts/Restaurant";
import { DAY_IN_ARRAY, HOUR_IN_ARRAY } from "../enum";
import { getHour } from "../Utils/helper";

const PER_PAGE = 20;

const TempHome = () => {
  const { push } = useHistory();
  const { restaurants, loadRestaurant, cleanRestaurant } = useRestaurant();
  const [ data, setData ] = useState([]);
  const [ day, setDay ] = useState(moment().format("dddd"));
  const [ hour, setHour ] = useState(getHour());
  const [ page, setPage ] = useState(1);
  const [ totalPage, setTotalPage ] = useState(1);
  const [ searchValue, setSearchValue ] = useState("");
  const [ modal, setModal ] = useState(null);
  
  useEffect(() => {
    loadRestaurant();
    return () => {
      cleanRestaurant();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    handleSetData();
    // eslint-disable-next-line
  }, [restaurants])

  useEffect(() => {
    handleSetData();
  // eslint-disable-next-line
  }, [page, searchValue, day, hour])

  const handleSetData = () => {
    const choseDay = moment().day(day).format("dddd, MMMM DD YYYY, ");
    const choseTime = moment(choseDay + hour).format("dddd, MMMM DD YYYY, HH:mm");
    const result = 
      _.chain(restaurants)
      .filter(resto => resto.name.toLowerCase().includes(searchValue.toLowerCase()))
      .filter(resto => 
        resto.opening[day].start && resto.opening[day].end
          && moment(choseDay + resto.opening[day].start).diff(choseTime, "minutes") <= 0
          && moment(choseDay + resto.opening[day].end).diff(choseTime, "minutes") >= 0
      )
      .take(PER_PAGE*page)
      .value();

    setData(result);
    setTotalPage(result.length/PER_PAGE);
  }

  return (
    <Container maxWidth={false} style={{height: "100%", textAlign: "center"}}>
      {modal ? <CollectionModal setModal={setModal} restaurant={modal} /> : null}
      <Grid container justifyContent="center" alignItems="center">
        <Grid item lg={2}></Grid>
        <Grid item lg={6}>
          <TextField 
            fullWidth 
            id="search-restaurant-name" 
            label="Search Restaurant" 
            variant="outlined"
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
          />
        </Grid>
        <Grid item lg={4} display="flex" justifyContent="flex-start">
          <Select
            id="day-select"
            value={day}
            label="Day"
            onChange={(e) => setDay(e.target.value)}
          >
            {DAY_IN_ARRAY.map(day => (
              <MenuItem key={`day-choice-${day.id}`} value={day.val}>{day.val}</MenuItem>
            ))}
          </Select>
          <Select
            id="hour-select"
            value={hour}
            label="Hour"
            onChange={(e) => setHour(e.target.value)}
          >
            {HOUR_IN_ARRAY.map(hour => (
              <MenuItem key={`hour-choice-${hour.id}`} value={hour.val}>{hour.val}</MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item lg={2}></Grid>
        <Grid item lg={12}>
          <Button variant="text" style={{marginTop: 8}} onClick={() => push("/my-collections")}>See My Collections</Button>
        </Grid>
        <Grid item xs={12} marginBottom={4}>
          <Grid container justifyContent="center" alignItems="center" marginTop={0} spacing={4}>
            {data.map(d => (
              <Grid key={d._id} item xs={12} md={4} lg={3}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {d.name}
                    </Typography>
                    <Box textAlign="left" marginTop={2} paddingLeft={2}>
                      <Typography variant="body1">Operational Hours</Typography>
                      {Object.keys(d.opening).filter(key => key !== '__typename').map(key => (
                        <Box key={`${d._id}-${key}`} display="flex" flexDirection="row">
                          <Typography variant="body2" width={100}>{key}</Typography>
                          <Typography variant="body2" width={10}>:</Typography>
                          <Typography variant="body2" sx={{fontWeight: "bold"}}>
                            {!d.opening[key].start ? "Closed" : `${d.opening[key].start} - ${d.opening[key].end}`}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                  <Box textAlign="right" paddingRight={2} paddingBottom={2}>
                    <Button 
                      variant="contained" 
                      color="secondary" 
                      size="small" 
                      onClick={() => setModal(d._id)}
                    >Add to Collection</Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
        {page <= totalPage ? 
          <Button onClick={() => setPage(prevPage => prevPage+1)} style={{marginBottom: 20}}>Load More</Button> 
        : null}
      </Grid>
    </Container>
  );
}

export default TempHome;
