import React, { useState } from 'react';
import { Button, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';

function MessaggioModal({ show, handleClose }) {
    const [copied, setCopied] = useState(false);
    const [copiedText, setCopiedText] = useState('');

    const FLUSSO_DI_COMPILAZIONE = [
        "step 'NOME-DELLO-STEP' [genID XXXXX] per la domanda", "L'utente ha visualizzato lo step 'NOME-DELLO-STEP'", "L'utente ha confermato lo step 'TITOLO-DELLO-STEP'", "L'utente è passato allo step 'TITOLO-DELLO-STEP'", "L'utente ha visualizzato il recap della domanda #XXXXX"
    ];
    const FORM_MULTIPLO = [
        "L'utente ha cliccato per aggiungere un nuovo form multiplo", "L'utente ha visualizzato il form multiplo in modalità NEW",
        "L'utente ha modificato il form multiplo ID XXXXX"
    ];

    const INTESTAZIONE = [
        "ADMIN CONSOLE", "USER CONSOLE - L'utente ha cliccato il pulsante per visualizzare il dettaglio e riprendere la compilazione", "ha archiviato il contact form GENID XXXXX",
        "ha modificato lo step"
    ];

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedText(text);
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
                setCopiedText('');
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    };

    return (
        <Modal show={show} onHide={handleClose} size='lg' className='Messaggio-modal' >
            <Modal.Header closeButton>
                <Modal.Title>Legenda “Messaggio”</Modal.Title>
            </Modal.Header>
            <Modal.Body className='ModalBody'>
                <Row className='Messaggio-Title'>
                    FLUSSO DI COMPILAZIONE
                </Row>
                {FLUSSO_DI_COMPILAZIONE?.map((element, i) => (
                    <Row key={i} className="Messaggio-text">
                        <span>{element}</span>
                        <span
                            onClick={() => handleCopy(element)}
                            style={{ cursor: 'pointer', fontWeight: 'bold', color: copied && copiedText === element ? 'green' : 'grey' }}
                        >
                            {copied && copiedText === element ? 'Copied!' : 'Copy'}
                        </span>
                    </Row>
                ))}

                <Row className='Messaggio-Title'>
                    FORM MULTIPLO
                </Row>
                {FORM_MULTIPLO?.map((element, i) => (
                    <Row key={i} className="Messaggio-text">
                        <span>{element}</span>
                        <span
                            onClick={() => handleCopy(element)}
                            style={{ cursor: 'pointer', fontWeight: 'bold', color: copied && copiedText === element ? 'green' : 'grey', marginLeft: '10px' }}
                        >
                            {copied && copiedText === element ? 'Copied!' : 'Copy'}
                        </span>
                    </Row>
                ))}

                <Row className='Messaggio-Title'>
                    {'INTESTAZIONE (ALTRI ESEMPI DA RIORDINARE)'}
                </Row>
                {INTESTAZIONE?.map((element, i) => (
                    <Row key={i} className="Messaggio-text">
                        <span>{element}</span>
                        <span
                            onClick={() => handleCopy(element)}
                            style={{ cursor: 'pointer', fontWeight: 'bold', color: copied && copiedText === element ? 'green' : 'grey', marginLeft: '10px' }}
                        >
                            {copied && copiedText === element ? 'Copied!' : 'Copy'}
                        </span>
                    </Row>
                ))}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={handleClose}>
                    Chiudi
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

MessaggioModal.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default MessaggioModal;
