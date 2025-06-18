import React, { useState, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";

const FileModal = ({ show, onClose, onSubmit }) => {
  const [sourceFile, setSourceFile] = useState(null);
  const [targetFile, setTargetFile] = useState(null);

  // refs for file inputs to reset their value manually
  const sourceInputRef = useRef(null);
  const targetInputRef = useRef(null);

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (type === "source") setSourceFile(file);
    else setTargetFile(file);
  };

  const removeFile = (type) => {
    if (type === "source") {
      setSourceFile(null);
      if (sourceInputRef.current) sourceInputRef.current.value = "";
    } else {
      setTargetFile(null);
      if (targetInputRef.current) targetInputRef.current.value = "";
    }
  };

  const handleCancel = () => {
    setSourceFile(null);
    setTargetFile(null);
    if (sourceInputRef.current) sourceInputRef.current.value = "";
    if (targetInputRef.current) targetInputRef.current.value = "";
    onClose();
  };

  const handleSubmit = () => {
    onSubmit(sourceFile, targetFile);
    setSourceFile(null);
    setTargetFile(null);
    if (sourceInputRef.current) sourceInputRef.current.value = "";
    if (targetInputRef.current) targetInputRef.current.value = "";
  };

  return (
    <Modal show={show} onHide={handleCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>Select Data Files</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Source Data File</Form.Label>
          <div className="d-flex align-items-center gap-2">
            <Form.Control type="file" onChange={(e) => handleFileChange(e, "source")} ref={sourceInputRef} aria-label="Select source data file" />
            {sourceFile && (
              <>
                {/* <span>{sourceFile.name}</span> */}
                <Button variant="outline-danger" size="sm" onClick={() => removeFile("source")} aria-label="Remove source data file">
                  <FaTimes />
                </Button>
              </>
            )}
          </div>
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label>Target Mapping File</Form.Label>
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
        <Button variant="primary" onClick={handleSubmit} disabled={!sourceFile || !targetFile}>
          Begin Mapping
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FileModal;
