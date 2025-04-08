const path = window.location.pathname;
const distro = path.split('/').pop().replace('.html', '');

document.addEventListener('DOMContentLoaded', () => {
  // Load Mirror Info Box
  fetch(`/data/${distro}.json`)
    .then(res => res.json())
    .then(data => {
      const box = document.getElementById("mirrorBox");
      box.innerHTML = `
        <div class="mirror-box">
          <ul>
            <li><strong>Last Sync:</strong> ${data.last_sync}</li>
            <li><strong>Frequency:</strong> ${data.frequency}</li>
            <li><strong>Status:</strong> ${data.status_icon} ${data.status}</li>
            <li><strong>Repo Size:</strong> ${data.repo_size}</li>
          </ul>
        </div>
      `;
    })
    .catch(err => {
      document.getElementById("mirrorBox").innerText = "⚠️ Failed to load mirror info.";
      console.error(err);
    });

  // Load ISO File Table
  fetch(`/data/${distro}-file.json`)
    .then(res => res.json())
    .then(files => {
      const tbody = document.querySelector("#isoTable tbody");
      tbody.innerHTML = ""; // Clear "Loading..."

      files.forEach(file => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${file.filename}</td>
          <td>${file.size}</td>
          <td>${file.arch}</td>
          <td><a href="${file.url}" target="_blank">Download</a></td>
        `;
        tbody.appendChild(row);
      });
    })
    .catch(err => {
      const tbody = document.querySelector("#isoTable tbody");
      tbody.innerHTML = "<tr><td colspan='4'>⚠️ Failed to load ISO list.</td></tr>";
      console.error(err);
    });

  // Load File List
  fetch(`/data/${distro}-file.json`)
    .then(res => res.json())
    .then(files => {
      const fileListContainer = document.getElementById("fileListContainer");
      fileListContainer.innerHTML = ""; // Clear "Loading files..."

      files.forEach(file => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
          <strong>${file.filename}</strong> (${file.size}, ${file.arch}) 
          - <a href="${file.url}" target="_blank">Download</a>
        `;
        fileListContainer.appendChild(listItem);
      });
    })
    .catch(err => {
      const fileListContainer = document.getElementById("fileListContainer");
      fileListContainer.innerHTML = "<li>⚠️ Failed to load file list.</li>";
      console.error("Error loading file list:", err);
    });

  // Load File List (Hardcoded for Testing)
  fetch(`/lists/fedora-file.json`) // Hardcoded path to fedora-file.json
    .then(res => {
      console.log("Response status:", res.status); // Log the response status
      return res.json();
    })
    .then(files => {
      console.log("Files data:", files); // Log the fetched data
      const fileListContainer = document.getElementById("fileListContainer");
      fileListContainer.innerHTML = ""; // Clear "Loading files..."

      files.forEach(file => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
          <strong>${file.filename}</strong> (${file.size}, ${file.arch}) 
          - <a href="${file.url}" target="_blank">Download</a>
        `;
        fileListContainer.appendChild(listItem);
      });
    })
    .catch(err => {
      console.error("Error loading file list:", err); // Log the error
      const fileListContainer = document.getElementById("fileListContainer");
      fileListContainer.innerHTML = "<li>⚠️ Failed to load file list.</li>";
    });
});
