# React + Vite
# Lead Management Kanban Board

A React.js application for managing sales leads using a Kanban board interface with draggable cards, customizable stages, agent assignment, priority tagging, time-tracking, and dashboard metrics.

## Features

- Dynamic Kanban board with customizable lead stages.
- Add, edit, and delete leads with details: name, contact, notes, assigned agent, priority, expected completion time.
- Drag-and-drop leads between stages with automatic completion timestamps for "Won" or "Lost" stages.
- Filter leads by name, assigned agent, or stage.
- CSV export of filtered leads for reporting.
- Dashboard summary with lead counts per stage and agent, including won and lost leads.
- Persistent data storage in localStorage.
- Responsive, polished UI with accessibility in mind.

## Installation

1. Clone the repository:
git clone <repository_url>
cd lead-management-kanban

2. Install dependencies:
npm install
npm install @dnd-kit/core
npm install @dnd-kit/modifiers
npm install @dnd-kit/sortable

4. Start the development server:
npm run dev

5. Open http://localhost:3000 in your browser.

## Usage

- Use the input box above the board to add new customizable stages.
- Click "+ Add Lead" in any stage column to create a new lead assigned to that stage.
- Drag lead cards to move them between stages.
- Click a lead card to edit lead details or delete the lead.
- Use filters to search leads and export filtered data as CSV.
- View real-time dashboard statistics at the bottom.

## Folder Structure

- `src/components/`: React components like LeadForm, StageColumn, LeadCard, DashboardSummary.
- `src/utils/`: Utility functions such as CSV export.
- `src/styles/`: CSS styling files.
- `src/App.jsx`: Main application container.
- `public/`: Static assets.

## Technologies Used

- React.js (functional components, hooks)
- JavaScript (ES6+)
- HTML5 & CSS3 (Flexbox)
- Browser localStorage for persistence
<img width="1918" height="964" alt="Screenshot 2025-11-21 162640" src="https://github.com/user-attachments/assets/bc878701-8fc4-44ed-b80e-e3c627863dc5" />

<img width="1919" height="968" alt="Screenshot 2025-11-21 162749" src="https://github.com/user-attachments/assets/41f00848-e2df-4e39-bf4c-2f146c777a37" />

<img width="1363" height="965" alt="Screenshot 2025-11-21 162958" src="https://github.com/user-attachments/assets/756aef7a-a7ae-44d7-b2c7-fb683d155022" />
