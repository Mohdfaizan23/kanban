export const exportToCSV = (leads) => {
  const csvRows = [
    ['Lead Name', 'Contact Info', 'Stage', 'Notes', 'Assigned Agent', 'Priority', 'Created Time', 'Expected Completion', 'Times Updated', 'Completed At'],
    ...leads.map(({ name, contact, stage, notes, agent, priority, created, expectedCompletion, updateCount, completedAt }) => [
      name,
      contact,
      stage,
      notes,
      agent,
      priority,
      created,
      expectedCompletion ? new Date(expectedCompletion).toLocaleString() : '',
      updateCount || 0,
      completedAt || '',
    ]),
  ];
  const csvString = csvRows.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
  const blob = new Blob([csvString], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `leads_${new Date().toISOString()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};
