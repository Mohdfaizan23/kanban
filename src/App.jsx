import React, { useState, useEffect } from 'react';
import { exportToCSV } from './utils/exportToCSV';
import LeadForm from './components/LeadForm';
import StageColumn from './components/StageColumn';
import DashboardSummary from './components/DashboardSummary';

const STORAGE_KEY = 'lead_management_kanban';
const defaultAgents = ['John', 'Priya', 'Ahmed'];
const defaultStages = ['Contacted', 'Qualified', 'Won', 'Lost'];

const priorityColors = { High: '#ff4c4c', Medium: '#ffa500', Low: '#4caf50' };

function LeadManagementKanban() {
  const [stages, setStages] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      return data.stages || defaultStages;
    }
    return defaultStages;
  });

  const [leads, setLeads] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      return data.leads || [];
    }
    return [];
  });

  const [agents] = useState(defaultAgents);

  const [newStageName, setNewStageName] = useState('');
  const [filterText, setFilterText] = useState('');
  const [filterAgent, setFilterAgent] = useState('');
  const [filterStage, setFilterStage] = useState('');
  const [selectedLead, setSelectedLead] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ stages, leads }));
  }, [stages, leads]);

  // Stage handlers
  const addStage = () => {
    if (!newStageName.trim()) return;
    if (stages.includes(newStageName.trim())) {
      alert('Stage name already exists');
      return;
    }
    setStages([...stages, newStageName.trim()]);
    setNewStageName('');
  };

  const renameStage = (oldName) => {
    const newName = prompt('Enter new name for stage', oldName);
    if (newName && newName.trim() && !stages.includes(newName.trim())) {
      setStages(stages.map(s => (s === oldName ? newName.trim() : s)));
      setLeads(leads.map(lead => (lead.stage === oldName ? { ...lead, stage: newName.trim() } : lead)));
    } else if (stages.includes(newName.trim())) {
      alert('Stage name already exists');
    }
  };

  const deleteStage = (stageName) => {
    if (!window.confirm(`Delete stage "${stageName}"? This will remove all leads in this stage.`)) return;
    setStages(stages.filter(s => s !== stageName));
    setLeads(leads.filter(lead => lead.stage !== stageName));
  };

  // Lead handlers
  const addLead = (stage) => {
    setSelectedLead({
      id: Date.now(),
      name: '',
      contact: '',
      stage,
      notes: '',
      agent: '',
      priority: 'Medium',
      created: new Date().toLocaleString(),
      expectedCompletion: '',
      updateCount: 0,
      completedAt: '',
    });
  };

  const saveLead = (lead) => {
    setLeads(prevLeads => {
      const exists = prevLeads.find(l => l.id === lead.id);
      if (exists) {
        return prevLeads.map(l => (l.id === lead.id ? lead : l));
      }
      return [...prevLeads, lead];
    });
    setSelectedLead(null);
  };

  const deleteLead = (id) => {
    if (window.confirm('Delete this lead?')) {
      setLeads(leads.filter(l => l.id !== id));
    }
  };

  // Drag and Drop handlers
  const onDragStart = (e, leadId) => {
    e.dataTransfer.setData('leadId', leadId);
  };
  const onDrop = (e, newStage) => {
    const leadId = parseInt(e.dataTransfer.getData('leadId'), 10);
    setLeads(leads.map(l => {
      if (l.id === leadId) {
        let updatedLead = { ...l, stage: newStage };
        if (newStage === 'Won' || newStage === 'Lost') {
          updatedLead.completedAt = new Date().toLocaleString();
        } else {
          delete updatedLead.completedAt;
        }
        return updatedLead;
      }
      return l;
    }));
  };
  const onDragOver = (e) => {
    e.preventDefault();
  };

  // Filtering leads
  const filteredLeads = leads.filter(l =>
    (!filterText || l.name.toLowerCase().includes(filterText.toLowerCase())) &&
    (!filterAgent || l.agent === filterAgent) &&
    (!filterStage || l.stage === filterStage)
  );

  // Dashboard stats
  const leadsPerStage = {};
  const leadsPerAgent = {};
  const completedLeadsByAgent = {};
  const lostLeadsByAgent = {};

  leads.forEach(lead => {
    leadsPerStage[lead.stage] = (leadsPerStage[lead.stage] || 0) + 1;
    leadsPerAgent[lead.agent] = (leadsPerAgent[lead.agent] || 0) + 1;

    if (lead.stage === 'Won') {
      if (!completedLeadsByAgent[lead.agent]) completedLeadsByAgent[lead.agent] = [];
      completedLeadsByAgent[lead.agent].push(lead.name);
    }
    if (lead.stage === 'Lost') {
      if (!lostLeadsByAgent[lead.agent]) lostLeadsByAgent[lead.agent] = [];
      lostLeadsByAgent[lead.agent].push(lead.name);
    }
  });

  return (
    <div className="kanban-board">
      <h1>Lead Management Kanban Board</h1>

      <div className="controls">
        <input
          type="text"
          placeholder="Add new stage"
          value={newStageName}
          onChange={e => setNewStageName(e.target.value)}
        />
        <button onClick={addStage}>Add Stage</button>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Search lead name..."
          value={filterText}
          onChange={e => setFilterText(e.target.value)}
        />
        <select value={filterStage} onChange={e => setFilterStage(e.target.value)}>
          <option value="">All Stages</option>
          {stages.map(stage => (
            <option key={stage} value={stage}>{stage}</option>
          ))}
        </select>
        <select value={filterAgent} onChange={e => setFilterAgent(e.target.value)}>
          <option value="">All Agents</option>
          {agents.map(agent => (
            <option key={agent} value={agent}>{agent}</option>
          ))}
        </select>
        <button onClick={() => exportToCSV(filteredLeads)}>Export Leads CSV</button>
      </div>

      <div className="board" style={{ display: 'flex', overflowX: 'auto' }}>
        {stages.map(stage => (
          <StageColumn
            key={stage}
            stage={stage}
            leads={filteredLeads.filter(l => l.stage === stage)}
            priorityColors={priorityColors}
            renameStage={renameStage}
            deleteStage={deleteStage}
            addLead={addLead}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragStart={onDragStart}
            onLeadClick={setSelectedLead}
            deleteLead={deleteLead}
          />
        ))}
      </div>

      {selectedLead && (
        <div className="modal" style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            backgroundColor: '#fff', padding: 20, borderRadius: 8, maxWidth: 400, width: '90%'
          }}>
            <LeadForm
              lead={selectedLead}
              onSave={saveLead}
              onCancel={() => setSelectedLead(null)}
              stages={stages}
              agents={agents}
              priorityColors={priorityColors}
            />
          </div>
        </div>
      )}

      <DashboardSummary
        stages={stages}
        agents={agents}
        leadsPerStage={leadsPerStage}
        leadsPerAgent={leadsPerAgent}
        completedLeadsByAgent={completedLeadsByAgent}
        lostLeadsByAgent={lostLeadsByAgent}
      />
    </div>
  );
}

export default LeadManagementKanban;
