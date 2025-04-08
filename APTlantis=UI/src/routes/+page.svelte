<script>
    import { onMount } from 'svelte';
  
    let mirrorData = null;
    let isoFiles = [];
  
    onMount(async () => {
      try {
        const res = await fetch('/data/fedora.json');
        mirrorData = await res.json();
      } catch (err) {
        console.error('Failed to load mirror data:', err);
      }
  
      try {
        const res = await fetch('/data/fedora-file.json');
        isoFiles = await res.json();
      } catch (err) {
        console.error('Failed to load ISO files:', err);
      }
    });
  </script>
  

  
  <div class="main-container">
    <img src="/aptlantis.png" alt="APTlantis Banner" class="banner-image" />
  
    <div id="distroGrid">
      <div class="distro-card">
        <h5 class="card-title">Debian</h5>
        <p class="card-text">
          Debian is a universal operating system known for its stability, wide architecture support, and powerful package system.
        </p>
        <a href="/debian" class="btn btn-primary card-button">Learn More</a>
      </div>
  
      <div class="distro-card">
        <h5 class="card-title">Fedora</h5>
        <p class="card-text">
          Fedora is a cutting-edge Linux distribution sponsored by Red Hat, known for innovation and upstream-first philosophy.
        </p>
        <a href="/fedora" class="btn btn-primary card-button">Learn More</a>
      </div>
  
      <div class="distro-card">
        <h5 class="card-title">Ubuntu</h5>
        <p class="card-text">
          Ubuntu is one of the most popular Linux distributions, based on Debian and designed for ease of use and community support.
        </p>
        <a href="/ubuntu" class="btn btn-primary card-button">Learn More</a>
      </div>

      <div class="distro-card">
        <h5 class="card-title">Alpine</h5>
        <p class="card-text">
          Alpine Linux is a security-oriented, lightweight Linux distribution based on musl libc and busybox.
        </p>
        <a href="/alpine" class="btn btn-primary card-button">Learn More</a>
      </div>
      
    </div>

    <!-- Add the Ko-fi button -->
    <div id="ko-fi-button" style="margin-top: 20px;">
      <script type="text/javascript" src="https://storage.ko-fi.com/cdn/widget/Widget_2.js"></script>
      <script type="text/javascript">
        kofiwidget2.init('Support me on Ko-fi', '#72a4f2', 'S6S31D55CR');
        kofiwidget2.draw();
      </script>
    </div>
  
    {#if mirrorData}
      <div id="mirrorBox">
        <ul>
          <li><strong>Last Sync:</strong> {mirrorData.last_sync}</li>
          <li><strong>Frequency:</strong> {mirrorData.frequency}</li>
          <li><strong>Status:</strong> {mirrorData.status_icon} {mirrorData.status}</li>
          <li><strong>Repo Size:</strong> {mirrorData.repo_size}</li>
        </ul>
      </div>
    {/if}
  
    {#if isoFiles.length}
      <table class="styled-table">
        <thead>
          <tr>
            <th>Filename</th>
            <th>Size</th>
            <th>Arch</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          {#each isoFiles as file}
            <tr>
              <td>{file.filename}</td>
              <td>{file.size}</td>
              <td>{file.arch}</td>
              <td><a href={file.url} target="_blank">Download</a></td>
            </tr>
          {/each}
        </tbody>
      </table>
    {/if}
  </div>
