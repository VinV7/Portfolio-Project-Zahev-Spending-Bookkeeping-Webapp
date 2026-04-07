const show = (id, btn) => {
    document.querySelectorAll('.panel').forEach(panel => panel.classList.add('hidden'))

    document.querySelectorAll('.sidebar-button').forEach(b => {
        b.classList.remove('bg-gray-200', 'text-gray-900');
    });


    document.getElementById('panel-' + id).classList.remove('hidden');
    btn.classList.add('bg-gray-200', 'text-gray-900');
}