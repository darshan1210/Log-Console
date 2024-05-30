import React, { useState } from 'react';
import { Accordion, Button, Card, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { Controller, useForm } from "react-hook-form"
import CustomToggle from '../../Components/CustomAccordionToggle';
import { InfoIcon } from '../../Assets/SVGs';
import MessaggioModal from '../../Components/MessaggioModal';
import LogDataTable from '../../Components/LogsDataTable';
import LogData from '../../Utils/Data/logs_json_mock_data__v01.json'


function LogConsole() {
    const [accordionToggle, setAccordionToggle] = useState(false)
    const [show, setShow] = useState(false);
    const [TableData, setTableData] = useState(null)

    const handleClose = () => setShow(false);
    const { control, handleSubmit } = useForm()

    function filterLogs(formData, logs) {
        return logs.filter(log => {
            let matches = true;

            if (formData.sID && log.user_id !== formData.sID) matches = false;

            if (formData.sFullName && !log.user_full_name.toLowerCase().includes(formData.sFullName.toLowerCase())) matches = false;

            if (formData.sMassage && !log.message.includes(formData.sMassage)) matches = false;
            if (formData.sModuleId && log.ef_module_id !== formData.sModuleId) matches = false;
            if (formData.sRichiestaId && log.ef_request_id !== formData.sRichiestaId) matches = false;

            if (formData.sStartDate || formData.sEndDate) {
                const logDate = new Date(log.log_date);
                const startDate = formData.sStartDate ? new Date(formData.sStartDate) : null;
                const endDate = formData.sEndDate ? new Date(formData.sEndDate) : null;
                if (startDate && logDate < startDate) matches = false;
                if (endDate && logDate > endDate) matches = false;
            }

            if (formData.sSessionId && log.session_id !== formData.sSessionId) matches = false;

            const servers = [
                formData.applsrv111 ? "applsrv111.xxx.test.com" : null,
                formData.applsrv222 ? "applsrv222.xxx.test.com" : null,
                formData.applsrv333 ? "applsrv333.xxx.test.com" : null,
                formData.applsrv444 ? "applsrv444.xxx.test.com" : null,
                formData.applsrv555 ? "applsrv555.xxx.test.com" : null
            ].filter(Boolean);

            if (servers.length > 0 && !servers.includes(log.appl_server)) matches = false;

            if (formData.sSelectService && log.service_name !== formData.sSelectService) matches = false;

            return matches;
        });
    }

    const onSubmit = (data) => {
        const filteredLogs = filterLogs(data, LogData);
        setTableData(filteredLogs)
    }


    return (
        <div className="App">

            <Card className='Form-Wrapper'>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Card.Header>RICERCA</Card.Header>
                    <Card.Body>

                        <Row lg={12}>
                            <Col lg={2}>Utente</Col>
                            <Col lg={3}>

                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">Id</InputGroup.Text>
                                    <Controller
                                        name='sID'
                                        control={control}
                                        render={({ field: { onChange, value, ref } }) => (
                                            <Form.Control
                                                type='text'
                                                aria-label="UserId"
                                                aria-describedby="basic-addon1"
                                                ref={ref}
                                                value={value}
                                                onChange={(e) => {
                                                    e.target.value = e.target.value?.trim() && e.target.value?.replace(/[^0-9]/g, '');
                                                    onChange(e)
                                                }}
                                            />
                                        )}
                                    />
                                </InputGroup>

                            </Col>
                            <Col lg={6}>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">Nome e cognome</InputGroup.Text>
                                    <Controller
                                        name='sFullName'
                                        control={control}
                                        render={({ field: { onChange, value, ref } }) => (
                                            <Form.Control
                                                aria-label="Username"
                                                aria-describedby="basic-addon2"
                                                ref={ref}
                                                value={value}
                                                onChange={(e) => onChange(e)}
                                            />
                                        )}
                                    />
                                </InputGroup>
                            </Col>
                        </Row>

                        <Row lg={12}>
                            <Col lg={2} className='mb-1'>
                                Messaggio <span onClick={() => setShow(true)}><InfoIcon /></span>
                            </Col>
                            <Col lg={9}>
                                <Controller
                                    name='sMassage'
                                    control={control}
                                    render={({ field: { onChange, value, ref } }) => (
                                        <Form.Control
                                            as="textarea"
                                            placeholder='Autosize height based on content lines'
                                            ref={ref}
                                            value={value}
                                            onChange={(e) => onChange(e)}
                                        />
                                    )}
                                />
                            </Col>
                        </Row>

                        <Row lg={12} className='mt-3'>
                            <Col lg={2}>
                                ID modulo
                            </Col>
                            <Col lg={3}>
                                <Controller
                                    name='sModuleId'
                                    control={control}
                                    render={({ field: { onChange, value, ref } }) => (
                                        <Form.Control
                                            type="text"
                                            ref={ref}
                                            value={value}
                                            onChange={(e) => {
                                                e.target.value = e.target.value?.trim() && e.target.value?.replace(/[^0-9]/g, '');
                                                onChange(e)
                                            }}
                                        />
                                    )}
                                />
                            </Col>
                        </Row>
                        <Row lg={12} className='mt-3'>
                            <Col lg={2}>
                                ID richiesta
                            </Col>
                            <Col lg={3}>
                                <Controller
                                    name='sRichiestaId'
                                    control={control}
                                    render={({ field: { onChange, value, ref } }) => (
                                        <Form.Control
                                            type="text"
                                            ref={ref}
                                            value={value}
                                            onChange={(e) => {
                                                e.target.value = e.target.value?.trim() && e.target.value?.replace(/[^0-9]/g, '');
                                                onChange(e)
                                            }}
                                        />
                                    )}
                                />
                            </Col>
                        </Row>
                        <Row lg={12} className='mt-3'>
                            <Col lg={2}>
                                Dal
                            </Col>
                            <Col lg={3}>
                                <Controller
                                    name='sStartDate'
                                    control={control}
                                    render={({ field: { onChange, value, ref } }) => (
                                        <input
                                            type="datetime-local"
                                            ref={ref}
                                            value={value}
                                            onChange={(e) => onChange(e)}
                                        />
                                    )}
                                />
                            </Col>
                        </Row>

                        <Row lg={12} className='mt-3'>
                            <Col lg={2}>
                                Al
                            </Col>
                            <Col lg={3}>
                                <Controller
                                    name='sEndDate'
                                    control={control}
                                    render={({ field: { onChange, value, ref } }) => (
                                        <input
                                            type="datetime-local"
                                            ref={ref}
                                            value={value}
                                            onChange={(e) => onChange(e)}
                                        />
                                    )}
                                />
                            </Col>
                        </Row>


                        <Accordion className='mt-3' defaultActiveKey="0">
                            <Card>
                                <Card.Header>
                                    <CustomToggle setAccordionToggle={setAccordionToggle} accordionToggle={accordionToggle} eventKey="1"> RICERCA AVANZATA</CustomToggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="1">
                                    <Card.Body>
                                        <Row lg={12} className='mt-3'>
                                            <Col lg={2}>
                                                Session ID
                                            </Col>
                                            <Col lg={9}>
                                                <Controller
                                                    name='sSessionId'
                                                    control={control}
                                                    render={({ field: { onChange, value, ref } }) => (
                                                        <Form.Control
                                                            type="text"
                                                            ref={ref}
                                                            value={value}
                                                            onChange={(e) => onChange(e)}
                                                        />
                                                    )}
                                                />
                                            </Col>
                                        </Row>
                                        <Row className='mt-3'>
                                            <Col lg={2}>
                                                Application Server
                                            </Col>
                                            <Col lg={3}>
                                                <Controller
                                                    name='applsrv111'
                                                    control={control}
                                                    render={({ field: { onChange, value, ref } }) => (
                                                        <Form.Check // prettier-ignore
                                                            type='checkbox'
                                                            id='applsrv111.xxx.test.com'
                                                            label='applsrv111.xxx.test.com'
                                                            ref={ref}
                                                            value={value}
                                                            onChange={(e) => { onChange(e) }}
                                                        />
                                                    )}
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg={2}>
                                            </Col>
                                            <Col lg={3}>
                                                <Controller
                                                    name='applsrv222'
                                                    control={control}
                                                    render={({ field: { onChange, value, ref } }) => (
                                                        <Form.Check // prettier-ignore
                                                            type='checkbox'
                                                            id='applsrv222.xxx.test.com'
                                                            label='applsrv222.xxx.test.com'
                                                            ref={ref}
                                                            value={value}
                                                            onChange={(e) => { onChange(e) }}
                                                        />
                                                    )}
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg={2}>
                                            </Col>
                                            <Col lg={3}>
                                                <Controller
                                                    name='applsrv333'
                                                    control={control}
                                                    render={({ field: { onChange, value, ref } }) => (
                                                        <Form.Check // prettier-ignore
                                                            type='checkbox'
                                                            id='applsrv333.xxx.test.com'
                                                            label='applsrv333.xxx.test.com'
                                                            ref={ref}
                                                            value={value}
                                                            onChange={(e) => { onChange(e) }}
                                                        />
                                                    )}
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg={2}>
                                            </Col>
                                            <Col lg={3}>
                                                <Controller
                                                    name='applsrv444'
                                                    control={control}
                                                    render={({ field: { onChange, value, ref } }) => (
                                                        <Form.Check // prettier-ignore
                                                            type='checkbox'
                                                            id='applsrv444.xxx.test.com'
                                                            label='applsrv444.xxx.test.com'
                                                            ref={ref}
                                                            value={value}
                                                            onChange={(e) => { onChange(e) }}
                                                        />
                                                    )}
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg={2}>
                                            </Col>
                                            <Col lg={3}>
                                                <Controller
                                                    name='applsrv555'
                                                    control={control}
                                                    render={({ field: { onChange, value, ref } }) => (
                                                        <Form.Check
                                                            type='checkbox'
                                                            id='applsrv555.xxx.test.com'
                                                            label='applsrv555.xxx.test.com'
                                                            ref={ref}
                                                            value={value}
                                                            onChange={(e) => { onChange(e) }}
                                                        />
                                                    )}
                                                />
                                            </Col>
                                        </Row>
                                        <Row lg={12} className='mt-3'>
                                            <Col lg={2}>
                                                Service Name
                                            </Col>
                                            <Col lg={9}>
                                                <Controller
                                                    name='sSelectService'
                                                    control={control}
                                                    render={({ field: { onChange, value, ref } }) => (
                                                        <Form.Select
                                                            ref={ref}
                                                            aria-label="select example"
                                                            value={value}
                                                            placeholder="Select Service"
                                                            onChange={(e) => { onChange(e) }}
                                                        >
                                                            <option value='' > Nessun valore selezionato </option>
                                                            <option value="elixForms">elixForms</option>
                                                            <option value="myApp">myApp</option>
                                                            <option value="myApp">myApp</option>
                                                            <option value="(null)">{'(null)'}</option>
                                                        </Form.Select>
                                                    )}
                                                />
                                            </Col>
                                        </Row>
                                        <Row lg={12} className='mt-3'>
                                            <Col lg={2}>
                                                Altri log
                                            </Col>
                                            <Col lg={9}>
                                                <Controller
                                                    name='sIUAuth'
                                                    control={control}
                                                    render={({ field: { onChange, value, ref } }) => (
                                                        <Form.Check
                                                            type="switch"
                                                            id="custom-switch"
                                                            label="Includi IUAuth"
                                                            ref={ref}
                                                            value={value}
                                                            onChange={(e) => { onChange(e) }}
                                                        />
                                                    )}
                                                />
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>

                    </Card.Body>
                    <Card.Footer className="d-flex justify-content-center">
                        <Button type='submit' variant="primary" >Cerca</Button>
                    </Card.Footer>
                </Form>
            </Card>
            {TableData !== null && <LogDataTable TableData={TableData} />}
            <MessaggioModal show={show} handleClose={handleClose} />
        </div>
    );
}

export default LogConsole;
