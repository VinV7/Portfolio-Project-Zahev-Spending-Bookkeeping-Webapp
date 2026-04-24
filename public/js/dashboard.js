document.addEventListener('DOMContentLoaded', async () => {
    try {
        const res = await fetch("http://localhost:7000/api/getDashboardValues", {
            credentials: "include",
        });
        
        const data = await res.json();

        document.getElementById('balanceAmount').textContent = data.balance ?? 0;
        document.getElementById('spentAmount').textContent = data.spending ?? 0;

        if (data.transactionHistory && data.transactionHistory.length > 0) {
            renderTransactions(data.transactionHistory, "transactionsContainer");
        } else {
            document.getElementById("spendingHistoryTab").classList.add("hidden");
            document.getElementById("notFound").classList.remove("hidden");
        }
    } catch (err) {
        console.error("Fetch Failed : ", err);
    }

    const updateBalForm = document.getElementById("updateBalanceForm");

    updateBalForm.onsubmit = async (e) => {
        e.preventDefault();

        try {
            const newBalance = document.getElementById("balanceInput").value;
            
            if (!Number.isInteger(Number(newBalance))) {
                document.getElementById("editBalsError").textContent = "Please enter a valid number.";
                return;
            } document.getElementById("editBalsError").textContent = "";

            await fetch("http://localhost:7000/api/updateBalance", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    newBalance: newBalance,
                })
            });

            document.getElementById('balanceAmount').textContent = newBalance;
            document.getElementById("balanceInput").value = "";
        } catch (err) {
            console.error("Fetch Failed : ", err);
        }
    };
    
    const addSpendingForm = document.getElementById("addSpendingForm");

    addSpendingForm.onsubmit = async (e) => {
        e.preventDefault();

        try  {
            const spendAmount = document.getElementById("amountSpentInput").value;
            const spendingDescription = document.getElementById("descriptionInput").value;

            if (!Number.isInteger(Number(spendAmount))) {
                document.getElementById("addSpendingError").textContent = "Please enter a valid number.";
                return;
            } document.getElementById("addSpendingError").textContent = "";

            const res = await fetch("http://localhost:7000/api/addSpending", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                }, 
                body: JSON.stringify({
                    amount: spendAmount,
                    description: spendingDescription,
                })
            })

            const receivedResponse = await res.json();

            document.getElementById("balanceAmount").textContent = receivedResponse.newBalance;
            document.getElementById("spentAmount").textContent = receivedResponse.newTotalSpent;

            renderTransactions(receivedResponse.newSpendingHistory, "transactionsContainer");
            document.getElementById("spendingHistoryTab").classList.remove("hidden");
            document.getElementById("notFound").classList.add("hidden");
            
        } catch (err) {
            console.error("Fetch Failed : ", err);
        }


    };
});

const showPanel = (id, btn) => {
    document.querySelectorAll('.panel').forEach(panel => panel.classList.add('hidden'))

    document.querySelectorAll('.sidebar-button').forEach(b => {
        b.classList.remove('bg-gray-200', 'text-gray-900');
    });


    document.getElementById('panel-' + id).classList.remove('hidden');
    btn.classList.add('bg-gray-200', 'text-gray-900');
};

const showDropdown = (id) => {
    const target = document.getElementById('dropdown-' + id);
    const isOpen = !target.classList.contains('hidden');

    document.querySelectorAll('.dropdown').forEach(d => d.classList.add('hidden'));

    if (!isOpen) {
        target.classList.remove('hidden');
    }
}; 

const selectMonth = async (btn, selectedMonth) => {
    btn.preventDefault();

    try {
        const res = await fetch("http://localhost:7000/api/selectMonthlyHistory", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                month: selectedMonth
            })
        });
    } catch(err) {
        console.error(err)
    }
};



const renderTransactions = (data, listContainer) => {
    const container = document.getElementById(listContainer);

    data.forEach(transaction => {
        const item = document.createElement('div');
        item.className = 'transaction-item';
        item.classList.add('grid', 'grid-cols-4', 'gap-4', 'p-2', 'items-center', 'text-center');

        const date = document.createElement('p');
        date.classList.add('font-medium');
        date.textContent = transaction.created_at;

        const description = document.createElement('p');
        description.classList.add('font-light');
        description.textContent = transaction.description;

        const amount = document.createElement('p');
        amount.classList.add('font-medium');
        amount.textContent = transaction.amount;

        const actionContainer = document.createElement('div');
        actionContainer.classList.add('flex', 'items-center', 'justify-center');
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('hover:cursor-pointer');
        const deleteIcon = document.createElement('img');
        deleteIcon.classList.add('h-12', 'w-auto', 'rounded-md', 'hover:bg-gray-200');
        deleteIcon.src = '../properties/utilitiesImgs/trash.svg';
        deleteBtn.appendChild(deleteIcon);
        actionContainer.appendChild(deleteBtn);

        item.appendChild(date);
        item.appendChild(description);
        item.appendChild(amount);
        item.appendChild(actionContainer);

        container.appendChild(item);
    })
};