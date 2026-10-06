import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import App from './App';
import { api } from './services/api';
import { workspace } from './data/workspace';

function renderPage(path = '/') {
  return render(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>);
}

describe('Workspace screens', () => {
  it('renders Acme, accurate workspace counts, recent boards, and navigation', async () => {
    renderPage();
    expect(await screen.findByRole('heading', { name: 'Welcome to Acme' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Workspace boards/ })).toHaveTextContent('3');
    expect(screen.getByRole('link', { name: /Workspace members/ })).toHaveTextContent('7');
    const recent = screen.getByRole('region', { name: 'Recent boards' });
    expect(within(recent).getAllByRole('link').slice(1).map((link) => link.textContent))
      .toEqual([
        expect.stringContaining('Product Roadmap'),
        expect.stringContaining('Customer Launches'),
        expect.stringContaining('Website Redesign'),
      ]);
    fireEvent.click(screen.getByRole('link', { name: 'Members' }));
    expect(await screen.findByRole('table', { name: 'Acme workspace members' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Members' })).toHaveAttribute('aria-current', 'page');
  });

  it('lists four internal members and three active guests together', async () => {
    renderPage('/members');
    const table = await screen.findByRole('table', { name: 'Acme workspace members' });
    expect(within(table).getAllByRole('row')).toHaveLength(8);
    for (const name of ['Jordan Lee', 'Sam Rivera', 'Priya Patel', 'Oliver Brooks']) {
      expect(within(table).getByRole('row', { name: new RegExp(name) })).toBeInTheDocument();
    }
    expect(within(table).getAllByText('Guest')).toHaveLength(3);
    for (const [name, email] of [
      ['Alex Morgan', 'freelancer@example.com'],
      ['Maya Chen', 'consultant@agency.com'],
      ['Daniel Ross', 'partner@vendor.com'],
    ]) {
      const row = within(table).getByRole('row', { name: new RegExp(name) });
      expect(within(row).getByText(email)).toBeInTheDocument();
      expect(within(row).getByText('Guest')).toBeInTheDocument();
      expect(within(row).getByText('Active')).toBeInTheDocument();
    }
    expect(screen.queryByText(/former|stale|who invited|external access/i)).not.toBeInTheDocument();
  });

  it('shows all three boards and Alex as a Website Redesign collaborator', async () => {
    renderPage('/boards');
    expect(await screen.findByRole('heading', { name: 'Product Roadmap' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Customer Launches' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Website Redesign' })).toBeInTheDocument();
    const team = screen.getByRole('list', { name: 'Website Redesign members' });
    expect(within(team).getByText('Alex Morgan')).toBeInTheDocument();
    expect(within(team).getByText('AM')).toHaveAttribute('aria-hidden', 'true');
  });

  it('shows loading and explicit API errors, then recovers on retry', async () => {
    vi.spyOn(api, 'getWorkspace').mockRejectedValueOnce(new Error('Sunday API request failed (503).'));
    renderPage();
    expect(screen.getByRole('status')).toHaveTextContent('Loading your workspace');
    expect(await screen.findByRole('alert')).toHaveTextContent('Sunday API request failed (503).');
    expect(screen.queryByRole('heading', { name: 'Welcome to Acme' })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));
    expect(await screen.findByRole('heading', { name: `Welcome to ${workspace.name}` })).toBeInTheDocument();
  });
});
