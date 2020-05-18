import React from 'react';
import {Modal, Segment, Form, DropdownProps} from 'semantic-ui-react';
import HealthCheckForm from './HealthcheckForm';
import axios from 'axios';
import {Entry} from '../types';
import {apiBaseUrl} from '../constants';
import {updatePatient, useStateValue} from '../state';
import {PatientEntry} from '../../../backend/src/types';
import HospitalForm from "./HospitalForm";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  error?: string;
  patientId: string;
}
const selectOptions = [
  {text: 'HealthCheck', value:'HealthCheck'},
  {text: 'Occupational Healthcare', value:'OccupationalHealthcare'},
  {text: 'Hospital', value:'Hospital'}
];
const AddEntryModal = ({ modalOpen, onClose, error, patientId }: Props) => {

  const [entryType, setEntryType] = React.useState<string>('HealthCheck');
  const [, dispatch] = useStateValue();

  const handleSelectChange = (
    _event: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    if (data.value)
      setEntryType(data.value.toString());
  };

  type EntryFormValues = Omit<Entry, 'id'>;
  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: updatedPatient } = await axios.post<PatientEntry>(
        `${apiBaseUrl}/patients/${patientId}/entries`,
        values
      );
      dispatch(updatePatient(updatedPatient));
      onClose();
    } catch (e) {
      console.error(e.response.data);
      //setError(e.response.data.error);
    }
  };

  const renderEntryForm = () =>{
    switch (entryType) {
    case 'HealthCheck':
      return <HealthCheckForm onSubmit={submitNewEntry} onCancel={onClose} />;
    case 'OccupationalHealthcare':
      return 'asfsafasf';
    case 'Hospital':
      return <HospitalForm onSubmit={submitNewEntry} onCancel={onClose} />;
    default:
      return null;
    }
  };

  return(
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add Entry</Modal.Header>
      <Modal.Content>

        <Form.Group>
          <label><strong>Select entry type: </strong></label>
          <Form.Select name='type'
            className="ui dropdown"
            value={entryType}
            onChange={handleSelectChange}
            options={selectOptions}/>
        </Form.Group>

        {renderEntryForm()}

        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        {/*<AddPatientForm onSubmit={onSubmit} onCancel={onClose} />*/}
      </Modal.Content>
    </Modal>
  );
};

export default AddEntryModal;