import React from 'react';

function StageColumn({
  stage,
  leads,
  priorityColors,
  renameStage,
  deleteStage,
  addLead,
  onDrop,
  onDragOver,
  onDragStart,
  onLeadClick,
  deleteLead
}) {
  return (
    <div
      className="stage-column"
      onDrop={e => onDrop(e, stage)}
      onDragOver={onDragOver}
      style={{
        minWidth: 300,
        margin: '0 10px',
        border: '1px solid #ccc',
        borderRadius: 5,
        padding: 8,
        backgroundColor: '#f9f9f9',
      }}
    >
      <div className="stage-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>{stage}</h3>
        <div>
          <button onClick={() => renameStage(stage)} title="Rename Stage">Edit</button>
          <button onClick={() => deleteStage(stage)} title="Delete Stage" style={{ color: 'red' }}>Delete</button>
        </div>
      </div>

      <button onClick={() => addLead(stage)} style={{ marginBottom: 8 }}>+ Add Lead</button>

      <div className="leads-list" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
        {leads.map(lead => (
          <div
            key={lead.id}
            className="lead-card"
            draggable
            onDragStart={e => onDragStart(e, lead.id)}
            style={{
              backgroundColor: lead.stage === 'Won' ? '#d1fae5'
                : lead.stage === 'Lost' ? '#ffe4e6'
                  : '#fff',
              borderLeft: `6px solid ${priorityColors[lead.priority] || '#000'}`,
              marginBottom: 8,
              padding: 8,
              borderRadius: 4,
              cursor: 'grab',
            }}
            onClick={() => onLeadClick(lead)}
          >
            <div><strong>{lead.name}</strong> ({lead.contact})</div>
            <div>Agent: {lead.agent || 'Unassigned'}</div>
            <div style={{ color: '#555', fontSize: 12 }}>{lead.notes}</div>
            <div style={{ fontSize: 11, color: '#888' }}>Created: {lead.created}</div>
            {lead.expectedCompletion && (
              <div style={{ fontSize: 12, marginTop: 4 }}>
                Expected Completion: {new Date(lead.expectedCompletion).toLocaleString()}
              </div>
            )}
            {lead.completedAt && (
              <div style={{
                fontSize: 13, marginTop: 4,
                color: lead.stage === 'Won' ? '#065f46' : '#b91c1c',
                fontWeight: 600
              }}>
                {lead.stage === 'Won' ? 'Completed' : 'Lost'} on: {lead.completedAt}
              </div>
            )}
            <div style={{ fontSize: 11, color: '#888' }}>
              Updated {lead.updateCount || 0} {lead.updateCount === 1 ? 'time' : 'times'}
            </div>
            <button
              onClick={e => {
                e.stopPropagation();
                deleteLead(lead.id);
              }}
              style={{ marginTop: 4, color: 'red', fontSize: 12 }}
            >
              Delete Lead
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StageColumn;
