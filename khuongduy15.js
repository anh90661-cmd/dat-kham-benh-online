// JAVASCRIPT ĐẶT LỊCH CỦA NGUYỄN KHƯƠNG DUY
function autoSelectDoctor(docName, deptName) {
    document.getElementById("iptDept").value = deptName;
    document.getElementById("iptDoctor").value = docName;
    triggerNotification("Hệ thống", `Đã chọn nhanh bác sĩ: ${docName}`);
}

// Bọc sự kiện submit để tránh lỗi không tìm thấy Form khi nhúng động
document.addEventListener("submit", function(e) {
    if (e.target && e.target.id === "formProRegistration") {
        e.preventDefault();
        
        // GIỮ NGUYÊN 100% LOGIC GỐC CỦA DUY ĐỂ LIÊN KẾT HỆ THỐNG CHUNG
        const newRecord = {
            id: "MĐ-" + Math.floor(1000 + Math.random() * 9000),
            name: document.getElementById("iptName").value,
            phone: document.getElementById("iptPhone").value,
            birth: document.getElementById("iptBirth").value,
            department: document.getElementById("iptDept").value,
            doctor: document.getElementById("iptDoctor").value,
            date: document.getElementById("iptDate").value,
            time: document.getElementById("iptTime").value,
            reason: document.getElementById("iptReason").value,
            cost: document.getElementById("iptDept").value === "Khoa Tim Mạch" ? 500000 : 300000,
            status: "Chờ duyệt"
        };
        
        localDatabaseStore.push(newRecord);
        triggerNotification("Thành công", "Đã gửi hồ sơ đặt lịch hẹn.");
        document.getElementById("formProRegistration").reset();
        refreshCoreAnalytics(); 
        renderApplicationTables();
    }
});