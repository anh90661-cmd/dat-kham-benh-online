function refreshCoreAnalytics() {
    const total = localDatabaseStore.length;
    const pending = localDatabaseStore.filter(r => r.status === "Chờ duyệt").length;
    const approved = localDatabaseStore.filter(r => r.status === "Đã xác nhận").length;
    const revenue = localDatabaseStore.filter(r => r.status === "Đã xác nhận").reduce((acc, curr) => acc + curr.cost, 0);

    if(document.getElementById("statTotal")) {
        document.getElementById("statTotal").innerText = total;
        document.getElementById("statPending").innerText = pending;
        document.getElementById("statApproved").innerText = approved;
        document.getElementById("statRevenue").innerText = revenue.toLocaleString('vi-VN') + "đ";
        document.getElementById("badgeUserCount").innerText = total;
        document.getElementById("badgePendingCount").innerText = pending;

        let ctTimMach = localDatabaseStore.filter(r => r.department === "Khoa Tim Mạch").length;
        let ctNhi = localDatabaseStore.filter(r => r.department === "Khoa Nhi Khoa").length;
        let pTim = total > 0 ? Math.round((ctTimMach / total) * 100) : 0;
        let pNhi = total > 0 ? Math.round((ctNhi / total) * 100) : 0;

        document.getElementById("barTimMach").style.width = pTim + "%";
        document.getElementById("barNhi").style.width = pNhi + "%";
        document.getElementById("valTimMach").innerText = pTim + "%";
        document.getElementById("valNhi").innerText = pNhi + "%";
    }
}

function renderApplicationTables() {
    const historyBody = document.getElementById("domHistoryTableBody");
    const adminBody = document.getElementById("domAdminTableBody");
    if(!historyBody) return;
    
    historyBody.innerHTML = ""; adminBody.innerHTML = "";

    localDatabaseStore.forEach((record, index) => {
        let badgeClass = record.status === "Chờ duyệt" ? "sp-pending" : "sp-success";
        historyBody.innerHTML += `<tr><td><strong>${record.id}</strong></td><td>${record.doctor}</td><td>${record.department}</td><td>${record.date}</td><td>${record.time}</td><td><span class="status-pill ${badgeClass}">${record.status}</span></td></tr>`;
        
        if(record.status === "Chờ duyệt") {
            adminBody.innerHTML += `<tr><td><strong>${record.id}</strong></td><td>${record.name}</td><td>${record.phone}</td><td>${record.doctor}</td><td>${record.reason}</td><td><button class="btn-table-action" onclick="executeApproveAction(${index})">Phê Duyệt</button></td></tr>`;
        }
    });
}

function executeApproveAction(index) {
    localDatabaseStore[index].status = "Đã xác nhận";
    triggerNotification("Admin", `Đã phê duyệt ca khám trực tuyến!`);
    refreshCoreAnalytics(); renderApplicationTables();
}
