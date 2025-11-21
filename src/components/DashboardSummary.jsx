import React from 'react';

function DashboardSummary({ stages, agents, leadsPerStage, leadsPerAgent, completedLeadsByAgent, lostLeadsByAgent }) {
  return (
    <div className="dashboard" style={{ marginTop: 20, padding: 10, borderTop: '1px solid #ccc' }}>
      <h3>Dashboard Summary</h3>
      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
        <div>
          <h4>Leads per Stage</h4>
          <ul>
            {stages.map(stage => (
              <li key={stage}>{stage}: {leadsPerStage[stage] || 0}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Leads per Agent</h4>
          <ul>
            {agents.map(agent => (
              <li key={agent}>{agent}: {leadsPerAgent[agent] || 0}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Won Leads per Agent</h4>
          <ul>
            {agents.map(agent => (
              <li key={agent}>
                {agent} ({completedLeadsByAgent[agent]?.length || 0})
                <ol>
                  {(completedLeadsByAgent[agent] || []).map((lead, i) => (
                    <li key={i}>{lead}</li>
                  ))}
                </ol>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Lost Leads per Agent</h4>
          <ul>
            {agents.map(agent => (
              <li key={agent}>
                {agent} ({lostLeadsByAgent[agent]?.length || 0})
                <ol>
                  {(lostLeadsByAgent[agent] || []).map((lead, i) => (
                    <li key={i}>{lead}</li>
                  ))}
                </ol>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DashboardSummary;
