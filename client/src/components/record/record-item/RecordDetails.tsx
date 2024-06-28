import React, { FC } from 'react';
import Grid from '@mui/material/Grid';
import { Dialog, DialogActions, DialogContent, DialogTitle, Paper, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { Record } from '../../../types/record-type';
import UpdateRecordForm from './UpdateRecordForm';
import DeleteRecord from './DeleteRecord';
import CloseIcon from '@mui/icons-material/Close';
import { dialogActionsStyle, gridItemStyle } from '../../../styles';
import DateFormatter from '../../utils/DateFormatter';
import AttachedFiles from './AttachedFiles';
import { useQuery } from '@apollo/client';
import { FILES_BY_RECORD_QUERY } from '../../../graphql/graphqlOperations';
import Loading from '../../Loading';
import SomethingWentWrong from '../../SomethingWentWrong';
import useDialog from '../../../hooks/useDialog';
import { COLORS } from '../../../types/colors';

type RecordDetailsProps = {
  record: Record;
  refetch: () => void;
};

const RecordDetails: FC<RecordDetailsProps> = (props) => {
  const { refetch } = props;
  const {name, title, created_at, age, note, id } = props.record;

  const { loading, error, data, refetch: fileRefetch } = useQuery(FILES_BY_RECORD_QUERY, { variables: { recordId: id }});

  const { open, handleClickOpen, handleClickClose } = useDialog();

  if (loading) return <Loading />;
  if (error) return <SomethingWentWrong />;

  return(
    <> 
      <Button variant='contained' startIcon={<SearchIcon />} onClick={handleClickOpen} >Details</Button>
        <Dialog open={open} onClose={handleClickClose}>
          <Paper style={{backgroundColor: COLORS.primary}}>
            <DialogTitle>
              <strong>Record details</strong>
            </DialogTitle>
            <DialogContent>
              <Paper>
                <Grid item style={gridItemStyle}>
                  <Typography paddingLeft={1}>
                    <strong>Reporter:</strong> {name}
                  </Typography>
                  <Typography paddingLeft={1}>
                    <strong>Age:</strong> {age}
                  </Typography>
                  <Typography paddingLeft={1}>
                    <strong>Title:</strong> {title}
                  </Typography>
                  <Typography paddingLeft={1}>
                    <strong>Note:</strong> {note}
                  </Typography>
                  <Typography paddingLeft={1}>
                    <strong>Created:</strong> <DateFormatter date={created_at}/>  
                  </Typography>
                  { data?.filesByRecord.totalNumber !== 0 && 
                    <AttachedFiles files={data?.filesByRecord.files}/>
                  }
                </Grid>
              </Paper>
            </DialogContent>
            <DialogActions style={dialogActionsStyle}>
              <Button variant='contained' startIcon={<CloseIcon />} onClick={handleClickClose}>Close</Button>
              <UpdateRecordForm record={props.record} files={data?.filesByRecord.files} refetch={refetch} fileRefetch={fileRefetch} />
              <DeleteRecord id={props.record.id} refetch={refetch} handleCloseAfterDelete={handleClickClose} />
            </DialogActions>
          </Paper>
        </Dialog>
    </>
  );
}

export default RecordDetails;