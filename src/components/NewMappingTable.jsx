import React, { useState } from "react";
import { Table, Button, Form } from "react-bootstrap";
import { FaPencilAlt, FaCheck, FaTimes } from "react-icons/fa";

const ENTITY_OPTIONS = ["CLAIM", "LOSS", "PAYMENT"];

const getAttribute = (targetField) => (targetField ? targetField.replace("ClaimRequest.", "") : "");

const NewMappingTable = ({ data, onSave, onSubmit, progress }) => {
  // Collect all unique attributes from all rows for dropdown options
  const allAttributes = Array.from(
    new Set(
      data
        .map((row) => row.targetField)
        .filter(Boolean)
        .map((tf) => getAttribute(tf))
    )
  );

  // Add entity and attribute state to each row
  const [editedData, setEditedData] = useState(
    data.map((row) => ({
      ...row,
      entity: "CLAIM",
      attribute: getAttribute(row.targetField),
    }))
  );
  const [editingRow, setEditingRow] = useState(null);

  const handleEdit = (idx) => setEditingRow(idx);

  const handleChange = (idx, field, value) => {
    setEditedData((prev) =>
      prev.map((row, i) =>
        i === idx
          ? {
              ...row,
              [field]: value,
            }
          : row
      )
    );
  };

  const handleRuleChange = (idx, value) => {
    setEditedData((prev) =>
      prev.map((row, i) =>
        i === idx
          ? {
              ...row,
              rules: value
                .split(";")
                .map((r) => r.trim())
                .filter(Boolean),
            }
          : row
      )
    );
  };

  const handleSave = () => setEditingRow(null);

  const handleCancel = () => setEditingRow(null);

  // Attribute dropdown options for each row (all unique attributes)
  const getAttributeOptions = () => allAttributes;

  return (
    <>
      <div style={{ maxHeight: "600px", maxWidth: "1400px", overflowY: editedData.length > 10 ? "auto" : "visible" }}>
        <Table
          striped
          bordered
          hover
          style={{
            border: "1px solid #23395d",
            borderCollapse: "separate",
            borderSpacing: 0,
            background: "#fff",
          }}
        >
          <thead>
            <tr style={{ background: "#e3eafc" }}>
              <th style={{ minWidth: 220, border: "1px solid #23395d", backgroundColor: "cadetblue" }}>Source: Sedgwick</th>
              <th style={{ minWidth: 220, border: "1px solid #23395d", backgroundColor: "cadetblue" }}>Transformation Rule</th>
              <th style={{ minWidth: 220, border: "1px solid #23395d", backgroundColor: "cadetblue" }}>Target: ECOS DC</th>
              <th style={{ width: 60, border: "1px solid #23395d", backgroundColor: "cadetblue" }}></th>
            </tr>
            <tr style={{ background: "#f0f4ff" }}>
              {/* Source sub-header */}
              <th colSpan={1} style={{ border: "1px solid #23395d", padding: 0, backgroundColor: "lightblue" }}>
                <div style={{ display: "flex", gap: 8, fontWeight: 500, padding: "6px 0 6px 8px" }}>
                  <span style={{ flex: 1 }}>Record Layout</span>
                  <span style={{ flex: 1 }}>Start Pos</span>
                  <span style={{ flex: 1 }}>End Pos</span>
                  <span style={{ flex: 2 }}>Column Name</span>
                </div>
              </th>
              <th style={{ border: "1px solid #23395d", backgroundColor: "lightblue" }}></th>
              {/* Target sub-header */}
              <th style={{ border: "1px solid #23395d", padding: 0, backgroundColor: "lightblue" }}>
                <div style={{ display: "flex", gap: 8, fontWeight: 500, padding: "6px 0 6px 8px" }}>
                  <span style={{ flex: 1 }}>Entity</span>
                  <span style={{ flex: 2 }}>Attribute</span>
                </div>
              </th>
              <th style={{ border: "1px solid #23395d", backgroundColor: "lightblue" }}></th>
            </tr>
          </thead>
          <tbody>
            {editedData.map((row, index) => (
              <tr key={index}>
                {/* Source column */}
                <td style={{ border: "1px solid #23395d" }}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <span style={{ flex: 1 }}>CLM</span>
                    <span style={{ flex: 1 }}>{row.startPosition || ""}</span>
                    <span style={{ flex: 1 }}>{row.endPosition || ""}</span>
                    <span style={{ flex: 2 }}>{row.sourceField || ""}</span>
                  </div>
                </td>
                {/* Transformation Rule */}
                <td style={{ border: "1px solid #23395d" }}>
                  {editingRow === index ? (
                    <Form.Control value={row.rules.join("; ")} onChange={(e) => handleRuleChange(index, e.target.value)} />
                  ) : (
                    row.rules.join("; ")
                  )}
                </td>
                {/* Target column */}
                <td style={{ border: "1px solid #23395d" }}>
                  <div style={{ display: "flex", gap: 8 }}>
                    {editingRow === index ? (
                      <>
                        <Form.Select style={{ flex: 1 }} value={row.entity} onChange={(e) => handleChange(index, "entity", e.target.value)}>
                          {ENTITY_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </Form.Select>
                        <Form.Select style={{ flex: 2 }} value={row.attribute} onChange={(e) => handleChange(index, "attribute", e.target.value)}>
                          {getAttributeOptions().map((attr) => (
                            <option key={attr} value={attr}>
                              {attr}
                            </option>
                          ))}
                        </Form.Select>
                      </>
                    ) : (
                      <>
                        <span style={{ flex: 1 }}>{row.entity}</span>
                        <span style={{ flex: 2 }}>{row.attribute}</span>
                      </>
                    )}
                  </div>
                </td>
                {/* Actions */}
                <td style={{ border: "1px solid #23395d" }}>
                  {editingRow === index ? (
                    <>
                      <Button variant="success" size="sm" onClick={handleSave}>
                        <FaCheck />
                      </Button>{" "}
                      <Button variant="outline-danger" size="sm" onClick={handleCancel}>
                        <FaTimes />
                      </Button>
                    </>
                  ) : (
                    <Button variant="outline-primary" size="sm" onClick={() => handleEdit(index)}>
                      <FaPencilAlt />
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="d-flex justify-content-center mt-3" style={{ gap: "12px" }}>
        <Button variant="primary" onClick={() => onSave(editedData)}>
          Save Mapping
        </Button>
        <Button variant="success" onClick={() => onSubmit()} disabled={progress.etlCompleted}>
          Submit Mapping
        </Button>
      </div>
    </>
  );
};

export default NewMappingTable;
