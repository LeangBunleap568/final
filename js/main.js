function updateDashboard() {
  const occupiedRoomsEl = document.getElementById("occupiedRooms");
  const recentCheckInEl = document.getElementById("recentCheckIn");
  const recentCheckOutEl = document.getElementById("recentCheckOut")
  if (occupiedRoomsEl || recentCheckInEl || recentCheckOutEl) {
    let customerInfor;
    customerInfor = localStorage.getItem("customerInfor") == null
      ? []
      : JSON.parse(localStorage.getItem("customerInfor"));
    const currentCustomerCount = customerInfor.length;
    if (occupiedRoomsEl) occupiedRoomsEl.textContent = currentCustomerCount;
    if (recentCheckInEl) {
      let totalAdditions = localStorage.getItem("totalAdditions");
      totalAdditions = totalAdditions === null
        ? currentCustomerCount
        : parseInt(totalAdditions);
      recentCheckInEl.textContent = totalAdditions;
    }
    if (recentCheckOutEl) {
      let totalDeletions = localStorage.getItem("totalDeletions");
      totalDeletions = totalDeletions === null
        ? 0
        : parseInt(totalDeletions);
      recentCheckOutEl.textContent = totalDeletions;
    }
  }
}
function validateForm() {
  const customerName = document.getElementById("name").value.trim();
  const customerEmail = document.getElementById("email").value.trim();
  const customerPhone = document.getElementById("phone").value.trim();
  const customerFloor = document.getElementById("floor").value.trim();
  const customerRoom = document.getElementById("room").value.trim();
  console.log(customerName, customerEmail, customerPhone, customerFloor, customerRoom)
  if ([customerName, customerEmail, customerPhone, customerFloor, customerRoom].some((item) => item === "")) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "All fields are required",
    });
    return false;
  }

  // Check email
  if (!customerEmail.includes("@")) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Invalid email address",
    });
    return false;
  }

  return true;
}

function showData() {
  customerInfor = localStorage.getItem("customerInfor") == null
    ? []
    : JSON.parse(localStorage.getItem("customerInfor"));

  const tbody = document.querySelector("#styled-table");
  if (tbody) {
    let customerDitail = "";
    customerInfor.forEach(function (customer, index) {
      const { customerName, customerEmail, customerPhone, customerFloor, customerRoom } = customer;
      customerDitail += `
        <tr class="tr guest-row">
          <td class="guest-name">${customerName}</td>
          <td class="guest-email"><a href="mailto:${customerEmail}" class="email-link">${customerEmail}</a></td>
          <td class="guest-phone">${customerPhone}</td>
          <td class="guest-room-number">${customerFloor}</td>
          <td class="guest-room-type">${customerRoom}</td>
          <td class="guest-status"><span class="status-badge status-checked-in">Check in</span></td>
          <td class="guest-actions">
            <button class="btn btn-edit" onclick="updateCustomer(${index})"><i class="fas fa-edit"></i></button>
            <button class="btn btn-delete" onclick="deleteCustomer(${index})"><i class="fas fa-trash"></i></button>
          </td>
        </tr>`;
    });
    tbody.innerHTML = customerDitail;
    if (customerInfor.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7">
            <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:20px; color:#555;">
              <i class="fas fa-user-slash" style="font-size:36px; margin-bottom:10px; color:#ccc;"></i>
              <span style="font-size:18px; font-weight:500;">Don't have Customer</span>
            </div>
          </td>
        </tr>`;
    }
  }

  // ===== UPDATE CARDS (if on detail-view page) =====
  updateCardView(customerInfor);

  // Update dashboard numbers
  updateDashboard();
}
function updateCardView(customerInfor) {
  const cardContainer = document.getElementById("cardContainer");
  if (!cardContainer) return;

  let DetailNone = "";

  if (customerInfor.length === 0) {
    DetailNone = `
      <div style="text-align: center; padding: 50px; background: white; border-radius: 16px;">
        <i class="fas fa-user-slash" style="font-size: 48px; color: #A6A09B; margin-bottom: 20px;"></i>
        <h3 style="color: #085479;">No guests found</h3>
        <p style="color: #A6A09B;">Try adding some customers first</p>
      </div>
    `;
  } else {
    const CustomerAvatar = ['#FF6B6B', '#4ECDC4', '#FFD166', '#06D6A0', '#118AB2', '#EF476F'];
    customerInfor.forEach(function (customer, index) {
      const { customerName, customerEmail, customerPhone, customerFloor, customerRoom } = customer;
      const firstLetter = customerName.charAt(0).toUpperCase();
      const customerProfile = CustomerAvatar[index % CustomerAvatar.length];
      DetailNone += `
    <div class="user-card">
        <div class="card-header">
            <div class="guest-name-section">
                <div class="guest-avatar" style="background: ${customerProfile}">
                    ${firstLetter}
                </div>
                
                <div class="guest-details">
                    <h2>${customerName}</h2>
                    <span class="guest-status">Checked In</span>
                </div>
            </div>
            
            <div class="room-info-grid">
                <div class="room-item">
                    <i class="fas fa-layer-group"></i>
                    <span>Floor ${customerFloor}</span>
                </div>
                <div class="room-item">
                    <i class="fas fa-door-open"></i>
                    <span>Room ${customerRoom}</span>
                </div>
            </div>
        </div>
        
        <div class="card-body">
            <div class="info-block">
                <label>Email Ad</label>
                <p style="font-family: 'Roboto', sans-serif;">${customerEmail}</p>
            </div>
            
            <div class="info-block">
                <label class="phone">Phone Number</label>
                <p style="font-family: 'Roboto', sans-serif;">${customerPhone}</p>
            </div>
        </div>
    </div>`;
    });
  }
  cardContainer.innerHTML = DetailNone;
  searchCustomer()
}
function addCustomer() {
  if (validateForm() == true) {
    let customerName = document.getElementById("name").value.trim();
    let customerEmail = document.getElementById("email").value.trim();
    let customerPhone = document.getElementById("phone").value.trim();
    let customerFloor = document.getElementById("floor").value.trim();
    let customerRoom = document.getElementById("room").value.trim();
    customerInfor = localStorage.getItem("customerInfor") == null
      ? []
      : JSON.parse(localStorage.getItem("customerInfor"));
    customerInfor.push({
      customerName: customerName,
      customerEmail: customerEmail,
      customerPhone: customerPhone,
      customerFloor: customerFloor,
      customerRoom: customerRoom,
    });
    localStorage.setItem("customerInfor", JSON.stringify(customerInfor));
    let totalAdditions = localStorage.getItem("totalAdditions");
    (totalAdditions === null)
      ? totalAdditions = 1
      : totalAdditions = parseInt(totalAdditions) + 1;
    localStorage.setItem("totalAdditions", totalAdditions);
    Swal.fire({
      title: "Success!",
      text: "Customer added successfully",
      icon: "success",
    });
    showData();
    ["name", "email", "phone", "floor", "room"].forEach(
      (inputId) => (document.getElementById(inputId).value = "")
    );
  }
}
function deleteCustomer(adminDelete) {
  let customerInfor;
  customerInfor = localStorage.getItem("customerInfor") == null
    ? []
    : JSON.parse(localStorage.getItem("customerInfor"));

  // Delete the customer
  customerInfor.splice(adminDelete, 1);
  localStorage.setItem("customerInfor", JSON.stringify(customerInfor));

  // INCREASE TOTAL DELETIONS COUNT
  let totalDeletions = localStorage.getItem("totalDeletions");
  if (totalDeletions === null) {
    totalDeletions = 1;
  } else {
    totalDeletions = parseInt(totalDeletions) + 1;
  }
  localStorage.setItem("totalDeletions", totalDeletions);

  // Update all views
  showData();
  // Clear form
  ["name", "email", "phone", "floor", "room"].forEach(
    (inputId) => (document.getElementById(inputId).value = ""),
  );
  Swal.fire({
    title: "Success!",
    text: "Operation completed successfully",
    icon: "success",
    draggable: true,
    confirmButtonText: "OK",
    confirmButtonColor: "#28a745",
    timer: 2000,
    timerProgressBar: true
  });
}
function empty() {
  ["name", "email", "phone", "floor", "room"].forEach(
    (inputId) => {
      const element = document.getElementById(inputId);
      if (element) element.value = "";
    }
  );
  return true;
}
function updateCustomer(customerUpdate) {
  const submitBtn = document.getElementById("submitBtn");
  const updateBtn = document.getElementById("updateBtn");
  const clearBtn = document.getElementById("clearBtn");

  if (submitBtn) submitBtn.style.display = "none";
  if (updateBtn) updateBtn.style.display = "block";
  if (clearBtn) clearBtn.style.display = "block";

  const customerInfor = JSON.parse(localStorage.getItem("customerInfor") || "[]");
  const customer = customerInfor[customerUpdate];

  document.getElementById("name").value = customer.customerName;
  document.getElementById("email").value = customer.customerEmail;
  document.getElementById("phone").value = customer.customerPhone;
  document.getElementById("floor").value = customer.customerFloor;
  document.getElementById("room").value = customer.customerRoom;

  if (updateBtn) {
    updateBtn.onclick = () => {
      if (!validateForm()) return;
      customer.customerName = document.getElementById("name").value;
      customer.customerEmail = document.getElementById("email").value;
      customer.customerPhone = document.getElementById("phone").value;
      customer.customerFloor = document.getElementById("floor").value;
      customer.customerRoom = document.getElementById("room").value;
      localStorage.setItem("customerInfor", JSON.stringify(customerInfor));

      // Update all views
      showData();
      Swal.fire({ title: "Updated successfully!", icon: "success", draggable: true });
      submitBtn.style.display = "block";
      updateBtn.style.display = "none";
      clearBtn.style.display = "none";
      empty();
    };
  }
  if (clearBtn) {
    clearBtn.onclick = () => {
      submitBtn.style.display = "block";
      updateBtn.style.display = "none";
      clearBtn.style.display = "none";
      empty();
    };
  }
}
function searchCustomer() {
  const searchInput = document.getElementById("searchInput");
  if (!searchInput) return;
  const searchTerm = searchInput.value.toLowerCase();
  customerInfor = localStorage.getItem("customerInfor") == null
    ? []
    : JSON.parse(localStorage.getItem("customerInfor"));
  const filteredCustomer = customerInfor.filter((customer) => {
    return (
      customer.customerName.toLowerCase().includes(searchTerm) ||
      customer.customerEmail.toLowerCase().includes(searchTerm) ||
      customer.customerPhone.toLowerCase().includes(searchTerm) ||
      customer.customerFloor.toString().includes(searchTerm) ||
      customer.customerRoom.toString().includes(searchTerm)
    );
  });
  const tbody = document.querySelector("#styled-table");
  if (tbody) {
    let customerFilered = "";
    filteredCustomer.forEach((customer, index) => {
      const { customerName, customerEmail, customerPhone, customerFloor, customerRoom } = customer;
      customerFilered += `
        <tr class="tr guest-row">
          <td class="guest-name">${customerName}</td>
          <td class="guest-email"><a href="mailto:${customerEmail}" class="email-link">${customerEmail}</a></td>
          <td class="guest-phone">${customerPhone}</td>
          <td class="guest-room-number">${customerFloor}</td>
          <td class="guest-room-type">${customerRoom}</td>
          <td class="guest-status"><span class="status-badge status-checked-in">Check in</span></td>
          <td class="guest-actions">
            <button class="btn btn-edit" onclick="updateCustomer(${index})"><i class="fas fa-edit"></i></button>
            <button class="btn btn-delete" onclick="deleteCustomer(${index})"><i class="fas fa-trash"></i></button>
          </td>
        </tr>`;
    });

    if (filteredCustomer.length > 0) {
      tbody.innerHTML = customerFilered;
    } else {
      tbody.innerHTML = `
        <tr>
          <td colspan="7">
            <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:20px; color:#555;">
              <i class="fas fa-user-slash" style="font-size:36px; margin-bottom:10px; color:#ccc;"></i>
              <span style="font-size:18px; font-weight:500;">No matching customer found</span>
            </div>
          </td>
        </tr>`;
    }
  }
  // Update card view
  updateCardView(filteredCustomer);
}
function clearAll() {
  customerInfor = localStorage.getItem("customerInfor") == null
    ? []
    : JSON.parse(localStorage.getItem("customerInfor"));
  if (customerInfor.length === 0) {
    Swal.fire({
      title: "No Customers Found",
      text: "There are no customers in the system yet. Add some customers to get started!",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwchDQzZ8RlAoWh6Aipvbx4FZauiD0t_OS0g&s",
      imageWidth: 300,
      imageHeight: 150,
      imageAlt: "Empty customer list",
      confirmButtonText: "Add Customer",
      confirmButtonColor: "#009E60",
      showCancelButton: false
    });
  }
  else {
    Swal.fire({
      title: "Clear All Data?",
      text: "This will delete all customer information permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#009E60",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, clear all!",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        document.querySelectorAll('table tbody tr').forEach(tr => tr.remove());
        localStorage.removeItem("customerInfor");

        Swal.fire({
          title: "Cleared!",
          text: "All customer data has been removed successfully.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false
        });
      }
    });
  }
}
document.addEventListener("DOMContentLoaded", function () {
  let customerInfor;
  customerInfor = localStorage.getItem("customerInfor") == null
    ? []
    : JSON.parse(localStorage.getItem("customerInfor"));
  if (localStorage.getItem("totalAdditions") === null) localStorage.setItem("totalAdditions", customerInfor.length.toString())
  if (localStorage.getItem("totalDeletions") === null) localStorage.setItem("totalDeletions", "0");

  updateDashboard();
  showData();
});