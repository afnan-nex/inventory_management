document.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '../pages/login.html';
        return;
    }

    const userNameEl = document.getElementById('userName');
    const userRoleEl = document.getElementById('userRole');
    const logoutBtn = document.getElementById('logoutBtn');

    logoutBtn.addEventListener('click', function () {
        localStorage.removeItem('token');
        window.location.href = '../pages/login.html';
    });

    async function loadDashboard() {
        try {
            const response = await fetch('/api/dashboard/stats', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to load dashboard');
            }

            const userData = data.data.user;
            userNameEl.textContent = userData.name;
            userRoleEl.textContent = userData.role.charAt(0).toUpperCase() + userData.role.slice(1);

            if (data.data.shop) {
                const shopNameEl = document.getElementById('shopName');
                shopNameEl.textContent = data.data.shop.name;
            }

            const stats = data.data.stats;
            document.getElementById('statProducts').textContent = stats.products;
            document.getElementById('statCustomers').textContent = stats.customers;
            document.getElementById('statSuppliers').textContent = stats.suppliers;
            document.getElementById('statSales').textContent = stats.sales;
            document.getElementById('statPurchases').textContent = stats.purchases;
            document.getElementById('statInventory').textContent = stats.inventory;
        } catch (error) {
            console.error('Dashboard error:', error);
            localStorage.removeItem('token');
            window.location.href = '../pages/login.html';
        }
    }

    loadDashboard();
});
