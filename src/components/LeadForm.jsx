import React, { useState } from 'react';

function LeadForm({ lead, onSave, onCancel, stages, agents, priorityColors }) {
  const [formData, setFormData] = useState(lead);
  const [tempExpectedCompletion, setTempExpectedCompletion] = useState(lead.expectedCompletion || '');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSetExpectedCompletion = () => {
    if (tempExpectedCompletion !== formData.expectedCompletion) {
      setFormData(prev => ({
        ...prev,
        expectedCompletion: tempExpectedCompletion,
        updateCount: (prev.updateCount || 0) + 1,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.contact.trim()) {
      alert('Lead name and contact are required');
      return;
    }
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="lead-form">
      <label>Lead Name:<br />
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </label><br />
      <label>Contact Info:<br />
        <input type="text" name="contact" value={formData.contact} onChange={handleChange} required />
      </label><br />
      <label>Stage:<br />
        <select name="stage" value={formData.stage} onChange={handleChange}>
          {stages.map(stage => (
            <option key={stage} value={stage}>{stage}</option>
          ))}
        </select>
      </label><br />
      <label>Notes:<br />
        <textarea name="notes" value={formData.notes} onChange={handleChange}></textarea>
      </label><br />
      <label>Assigned Agent:<br />
        <select name="agent" value={formData.agent} onChange={handleChange}>
          <option value="">-- Select agent --</option>
          {agents.map(agent => (
            <option key={agent} value={agent}>{agent}</option>
          ))}
        </select>
      </label><br />
      <label>Priority:<br />
        <select name="priority" value={formData.priority} onChange={handleChange}>
          {Object.keys(priorityColors).map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </label><br />
      <label>
        Expected Completion Date & Time:<br />
        <input
          type="datetime-local"
          name="expectedCompletion"
          value={tempExpectedCompletion}
          onChange={e => setTempExpectedCompletion(e.target.value)}
        />
        <button type="button" onClick={handleSetExpectedCompletion} style={{ marginLeft: '8px' }}>
          Set
        </button>
      </label><br />
      {formData.expectedCompletion && (
        <div>Date/time updated: {formData.updateCount || 0} {formData.updateCount === 1 ? 'time' : 'times'}</div>
      )}
      {formData.completedAt && (
        <div>Completed on: {formData.completedAt}</div>
      )}
      <button type="submit">Save Lead</button>&nbsp;
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
}

export default LeadForm;
