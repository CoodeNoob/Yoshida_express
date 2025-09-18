// history.js

// --- SEARCH FILTER ---
const searchInput = document.querySelector('input[placeholder*="Search"]');
searchInput.addEventListener('input', () => {
  const filter = searchInput.value.toLowerCase();
  document.querySelectorAll('tbody tr').forEach(row => {
    const text = row.innerText.toLowerCase();
    row.style.display = text.includes(filter) ? '' : 'none';
  });
});

// --- STATUS FILTER ---
const statusSelect = document.querySelector('select:nth-of-type(2)'); // second select is status
statusSelect.addEventListener('change', () => {
  const status = statusSelect.value.toLowerCase();
  document.querySelectorAll('tbody tr').forEach(row => {
    const badge = row.querySelector('td:nth-child(7) span');
    if (!badge) return;
    const rowStatus = badge.innerText.toLowerCase();
    row.style.display = (status === 'filter by status' || status === rowStatus) ? '' : 'none';
  });
});

// --- CANCEL BUTTON FUNCTIONALITY ---
document.querySelectorAll('.btn-danger').forEach(btn => {
  btn.addEventListener('click', () => {
    const row = btn.closest('tr');
    const badge = row.querySelector('td:nth-child(7) span');
    if (badge) {
      badge.innerText = 'Cancelled';
      badge.className = 'badge bg-danger';
    }
    btn.remove(); // remove cancel button after cancelling
  });
});

// --- VIEW BUTTON FUNCTIONALITY ---
document.querySelectorAll('.btn-custom').forEach(btn => {
  btn.addEventListener('click', () => {
    const row = btn.closest('tr');
    const bookingID = row.querySelector('td:first-child').innerText;
    alert('View details for Booking ID: ' + bookingID);
  });
});
