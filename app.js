// =========================
// Enda Şenol — app.js (OL + Embed Fallback)
// =========================

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

/* ---------- MAP INIT WITH AUTO-FALLBACK ---------- */
(function setupMap(){
  const mapEl = $('#map');
  if (!mapEl) return;

  let mapReady = false;

  // 1) Try OpenLayers
  tryInitOpenLayers().catch(()=>{ /* ignore */ });

  // 2) If not ready in 1000ms, fallback to Google Maps embed (no keys, no libs)
  setTimeout(() => {
    if (!mapReady) {
      injectGoogleEmbed(mapEl);
    }
  }, 1000);

  function tryInitOpenLayers(){
    return new Promise((resolve) => {
      // wait a bit for OL to load if CDN slow
      let tries = 0;
      const iv = setInterval(() => {
        tries++;
        if (typeof window.ol !== 'undefined') {
          clearInterval(iv);
          initOL();
          mapReady = true;
          resolve();
        } else if (tries > 10) { // ~1s total
          clearInterval(iv);
          resolve(); // will trigger fallback
        }
      }, 100);
    });
  }

  function initOL(){
    // Beytepe Campus
    const lon = 32.748, lat = 39.87;
    const center = ol.proj.fromLonLat([lon, lat]);

    const base = new ol.layer.Tile({ source: new ol.source.OSM() });

    const view = new ol.View({
      center, zoom: 16, minZoom: 3, maxZoom: 19
    });

    const map = new ol.Map({
      target: 'map',
      layers: [base],
      view,
      controls: ol.control.defaults().extend([
        new ol.control.Zoom(),
        new ol.control.ZoomSlider(),
        new ol.control.ScaleLine({ units: 'metric' }),
        new ol.control.FullScreen()
      ])
    });

    // Marker
    const marker = new ol.Feature({ geometry: new ol.geom.Point(center) });
    marker.setStyle(new ol.style.Style({
      image: new ol.style.Circle({
        radius: 8,
        fill: new ol.style.Fill({ color: 'rgba(124,156,255,0.95)' }),
        stroke: new ol.style.Stroke({ color: '#fff', width: 2 })
      })
    }));
    const vectorLayer = new ol.layer.Vector({
      source: new ol.source.Vector({ features: [marker] })
    });
    map.addLayer(vectorLayer);

    // Popup on click
    const popupEl = document.createElement('div');
    popupEl.className = 'map-popup';
    popupEl.innerHTML = `<strong>Beytepe Campus</strong><br/>Hacettepe University`;
    Object.assign(popupEl.style, {
      background: 'rgba(0,0,0,0.65)',
      color: '#fff',
      padding: '8px 10px',
      borderRadius: '10px',
      border: '1px solid rgba(255,255,255,0.35)',
      boxShadow: '0 8px 18px rgba(0,0,0,0.35)',
      backdropFilter: 'blur(6px)',
      WebkitBackdropFilter: 'blur(6px)',
      fontSize: '12px',
      transform: 'translateY(-8px)'
    });
    const popup = new ol.Overlay({
      element: popupEl,
      positioning: 'bottom-center',
      stopEvent: false,
      offset: [0, -12]
    });
    map.addOverlay(popup);

    map.on('singleclick', (evt) => {
      const feature = map.forEachFeatureAtPixel(evt.pixel, f => f);
      popup.setPosition(feature ? feature.getGeometry().getCoordinates() : undefined);
    });

    // Stabilize center/zoom on resize
    const lock = () => { view.setCenter(center); view.setZoom(16); };
    map.once('rendercomplete', () => {
      lock();
      setTimeout(() => { map.updateSize(); lock(); }, 300);
    });
    new ResizeObserver(() => { map.updateSize(); }).observe(mapEl);
  }

  function injectGoogleEmbed(container){
    const lat = 39.87, lon = 32.748, zoom = 16;
    container.innerHTML = `
      <iframe
        title="Beytepe Campus — Map"
        src="https://www.google.com/maps?q=${lat},${lon}&z=${zoom}&hl=en&output=embed"
        style="width:100%;height:420px;border:0;border-radius:16px"
        loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen>
      </iframe>
    `;
  }
})();

/* ---------- Progress bars (unchanged) ---------- */
(function animateProgressBars(){
  const bars = $$('.progress');
  if (!bars.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const span = bar.querySelector('span');
        const val = bar.getAttribute('data-val') || '0%';
        requestAnimationFrame(() => { span.style.width = val; });
        io.unobserve(bar);
      }
    });
  }, { threshold: 0.2 });
  bars.forEach(b => {
    const s = b.querySelector('span');
    if (s) s.style.width = '0%';
    io.observe(b);
  });
})();

/* ---------- Card reveal (unchanged) ---------- */
(function revealCards(){
  const cards = $$('.card');
  if (!cards.length) return;
  cards.forEach(c => {
    c.style.opacity = '0';
    c.style.transform = 'translateY(14px)';
    c.style.transition = 'opacity .6s ease, transform .6s ease';
  });
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        io.unobserve(el);
      }
    });
  }, { threshold: 0.12 });
  cards.forEach(c => io.observe(c));
})();






