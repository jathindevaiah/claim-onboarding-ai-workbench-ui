import React, { useState, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";

const FileModal = ({ show, onClose, onSubmit }) => {
  const [sourceFile1, setSourceFile1] = useState(null);
  const [targetFile, setTargetFile] = useState(null);

  const sourceInputRef1 = useRef(null);
  const targetInputRef = useRef(null);

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (type === "source1") setSourceFile1(file);
    else setTargetFile(file);
  };

  const removeFile = (type) => {
    if (type === "source1") {
      setSourceFile1(null);
      if (sourceInputRef1.current) sourceInputRef1.current.value = "";
    } else {
      setTargetFile(null);
      if (targetInputRef.current) targetInputRef.current.value = "";
    }
  };

  const handleCancel = () => {
    setSourceFile1(null);
    setTargetFile(null);
    if (sourceInputRef1.current) sourceInputRef1.current.value = "";
    if (targetInputRef.current) targetInputRef.current.value = "";
    onClose();
  };

  const handleSubmit = () => {
    onSubmit(sourceFile1, targetFile);
    setSourceFile1(null);
    setTargetFile(null);
    if (sourceInputRef1.current) sourceInputRef1.current.value = "";
    if (targetInputRef.current) targetInputRef.current.value = "";
  };

  return (
    <Modal show={show} onHide={handleCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>Select Data Files</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Source Data Defintion</Form.Label>
          <div className="d-flex align-items-center gap-2">
            <Form.Control type="file" onChange={(e) => handleFileChange(e, "source1")} ref={sourceInputRef1} aria-label="Select source data file 1" />
            {sourceFile1 && (
              <>
                <Button variant="outline-danger" size="sm" onClick={() => removeFile("source1")} aria-label="Remove source data file 1">
                  <FaTimes />
                </Button>
              </>
            )}
          </div>
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label>Target Data Defintion</Form.Label>
          <div className="d-flex align-items-center gap-2">
            <Form.Control type="file" onChange={(e) => handleFileChange(e, "target")} ref={targetInputRef} aria-label="Select target mapping file" />
            {targetFile && (
              <>
                <Button variant="outline-danger" size="sm" onClick={() => removeFile("target")} aria-label="Remove target mapping file">
                  <FaTimes />
                </Button>
              </>
            )}
          </div>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={!sourceFile1 || !targetFile}>
          Begin Mapping
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FileModal;
