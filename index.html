document.addEventListener('DOMContentLoaded', () => {
    // 1. RIFERIMENTI AGLI ELEMENTI DEL DOM
    const refs = {
        form: document.getElementById('form-produzione'),
        list: document.getElementById('elenco-produzioni'),
        editId: document.getElementById('edit-id'),
        formTitle: document.getElementById('form-title'),
        submitBtn: document.getElementById('submit-button'),
        date: document.getElementById('data'),
        category: document.getElementById('categoria'),
        quantity: document.getElementById('quantita'),
        unit: document.getElementById('unita'),
        productLabel: document.getElementById('label-prodotto'),
        productSelectWrapper: document.getElementById('prodotto-select-wrapper'),
        productInputWrapper: document.getElementById('prodotto-input-wrapper'),
        productSelect: document.getElementById('prodotto-select'),
        productInput: document.getElementById('prodotto-input'),
        productInputLabel: document.getElementById('label-prodotto-input'),
        riepilogoTitolo: document.getElementById('riepilogo-titolo'),
        riepilogoSottotitolo: document.getElementById('riepilogo-sottotitolo'),
        riepilogoElementi: { 
            kgPv: document.getElementById('tot-pv-kg'), pzPv: document.getElementById('tot-pv-pz'), 
            kgBisc: document.getElementById('tot-bisc-kg'), pzBisc: document.getElementById('tot-bisc-pz') 
        },
        navPrev: document.getElementById('nav-prev'),
        navNext: document.getElementById('nav-next'),
        navToday: document.getElementById('nav-today'),
        stampaBtn: document.getElementById('stampa-riepilogo'),
        analizzaBtn: document.getElementById('analizza-prodotti-btn'),
        esportaBtn: document.getElementById('esporta-csv-btn'),
        viewButtons: {
            week: document.getElementById('view-week-btn'),
            month: document.getElementById('view-month-btn'),
            year: document.getElementById('view-year-btn')
        },
        installBtn: document.getElementById('install-button'),
        installModal: document.getElementById('install-instructions-modal'),
        closeModalBtn: document.getElementById('close-modal-btn'),
        analisiModal: document.getElementById('analisi-modal-overlay'),
        analisiModalCloseBtn: document.getElementById('analisi-modal-close-btn'),
        analisiModalTitolo: document.getElementById('analisi-modal-titolo'),
        analisiModalLista: document.getElementById('analisi-modal-lista'),
    };

    // 2. STATO DELL'APPLICAZIONE
    const CATALOGO_VERSIONE = '5.0';
    let data = {
        produzioni: [],
        catalogo: {},
        dataRif: new Date(),
        filtrati: { week: [], month: [], year: [] },
        vistaCorrente: 'week'
    };

    const catalogoDefault = { "Mondadori": { categoria: "Punti Vendita", unita: "Kg" }, "Palazzolo": { categoria: "Punti Vendita", unita: "Kg" }, "Osio": { categoria: "Punti Vendita", unita: "Kg" }, "Cassano": { categoria: "Punti Vendita", unita: "Kg" }, "Carugate": { categoria: "Punti Vendita", unita: "Kg" }, "Negozio": { categoria: "Punti Vendita", unita: "Kg" }, "Ordini": { categoria: "Punti Vendita", unita: "Kg" }, "Esse": { categoria: "Biscotti", unita: "Kg" }, "Viennesi": { categoria: "Biscotti", unita: "Kg" }, "Pertikus": { categoria: "Biscotti", unita: "Kg" }, "Canestrelli": { categoria: "Biscotti", unita: "Kg" }, "Sablè Burro": { categoria: "Biscotti", unita: "Kg" }, "Baci Dama": { categoria: "Biscotti", unita: "Kg" }, "Piemontesi": { categoria: "Biscotti", unita: "Kg" }, "Sablè Cara": { categoria: "Biscotti", unita: "Kg" }, "Mini Bresciani": { categoria: "Biscotti", unita: "Kg" }, "Pan Turco": { categoria: "Biscotti", unita: "Kg" }, "Fave": { categoria: "Biscotti", unita: "Pezzi" }, "Pane dei morti": { categoria: "Biscotti", unita: "Pezzi" } };
    const salvaDati = () => { const appData = { produzioni: data.produzioni, catalogo: data.catalogo, catalogoVersione: CATALOGO_VERSIONE }; localStorage.setItem('graficoProduzioneData', JSON.stringify(appData)); };
    const caricaDati = () => { const appData = JSON.parse(localStorage.getItem('graficoProduzioneData')) || {}; data.produzioni = appData.produzioni || []; if (appData.catalogoVersione !== CATALOGO_VERSIONE) { data.catalogo = { ...catalogoDefault, ...(appData.catalogo || {}) }; } else { data.catalogo = appData.catalogo || catalogoDefault; } salvaDati(); };
    const formattaNumero = (num, unita) => (unita === 'Pezzi') ? Math.round(num).toString() : num.toFixed(1).replace('.', ',');
    const setDefaultDate = () => { refs.date.value = new Date().toISOString().split('T')[0]; };
    const popolaProdottiSelect = (categoria) => { refs.productSelect.innerHTML = '<option value="" disabled selected>-- Seleziona --</option>'; Object.keys(data.catalogo).sort().forEach(nome => { if (data.catalogo[nome].categoria === categoria) { refs.productSelect.innerHTML += `<option value="${nome}">${nome}</option>`; } }); refs.productSelect.innerHTML += '<option value="---altro---">--- Altro (digita nuovo) ---</option>'; };
    const resettaForm = () => { refs.form.reset(); refs.editId.value = ''; refs.formTitle.textContent = 'Aggiungi Voce'; refs.submitBtn.textContent = 'Aggiungi'; setDefaultDate(); refs.productSelectWrapper.classList.add('hidden'); refs.productInputWrapper.classList.add('hidden'); refs.productSelect.innerHTML = ''; refs.category.value = ''; };
    const gestisciCambioCategoria = () => { const categoriaSelezionata = refs.category.value; refs.unit.value = 'Kg'; if (categoriaSelezionata) { refs.productLabel.textContent = (categoriaSelezionata === "Punti Vendita") ? "Punto Vendita:" : "Nome Prodotto:"; refs.productSelectWrapper.classList.remove('hidden'); popolaProdottiSelect(categoriaSelezionata); } };
    const gestisciSelezioneProdotto = () => { const prodottoSelezionato = refs.productSelect.value; if (prodottoSelezionato === '---altro---') { refs.productInputWrapper.classList.remove('hidden'); refs.productInput.value = ''; refs.productInput.focus(); } else { refs.productInputWrapper.classList.add('hidden'); if (data.catalogo[prodottoSelezionato]) { refs.unit.value = data.catalogo[prodottoSelezionato].unita; } } };
    const gestisciSubmitForm = (event) => { event.preventDefault(); const quantitaStringa = refs.quantity.value.replace(',', '.'); const quantitaNumero = parseFloat(quantitaStringa); if (isNaN(quantitaNumero) || quantitaNumero <= 0) return alert('Per favore, inserisci una quantità valida.'); let nomeProdotto = (refs.productSelect.value === '---altro---') ? refs.productInput.value.trim() : refs.productSelect.value; if (!nomeProdotto) return alert('Per favore, seleziona o inserisci un prodotto/punto vendita.'); const categoriaSelezionata = refs.category.value; const unitaSelezionata = refs.unit.value; data.catalogo[nomeProdotto] = { categoria: categoriaSelezionata, unita: unitaSelezionata }; const isEditing = !!refs.editId.value; const idDaModificare = refs.editId.value; if (idDaModificare) { const index = data.produzioni.findIndex(p => p.id == idDaModificare); if (index !== -1) data.produzioni[index] = { ...data.produzioni[index], data: refs.date.value, prodotto: nomeProdotto, quantita: quantitaNumero, categoria: categoriaSelezionata, unita: unitaSelezionata }; } else { data.produzioni.unshift({ id: Date.now(), data: refs.date.value, prodotto: nomeProdotto, quantita: quantitaNumero, categoria: categoriaSelezionata, unita: unitaSelezionata }); } data.produzioni.sort((a, b) => new Date(b.data) - new Date(a.data)); salvaDati(); data.dataRif = new Date(refs.date.value); aggiornaUI(); refs.submitBtn.classList.add('success'); refs.submitBtn.textContent = isEditing ? 'MODIFICATO!!!' : 'FATTO!!!'; setTimeout(() => { resettaForm(); }, 1500); };
    const gestisciClickLista = (event) => { const target = event.target.closest('button'); if (!target) return; if (target.classList.contains('gestisci-giorno-btn')) { const dataGiorno = target.dataset.data; const contenitoreVoci = document.querySelector(`.voci-giorno[data-data="${dataGiorno}"]`); if (contenitoreVoci) { contenitoreVoci.classList.toggle('editing'); target.classList.toggle('active'); } return; } const id = target.dataset.id; if (!id) return; const prod = data.produzioni.find(p => p.id == id); if (!prod) return; if (target.classList.contains('modifica-btn')) { refs.date.value = prod.data; refs.category.value = prod.categoria; gestisciCambioCategoria(); refs.productSelect.value = prod.prodotto; if (!refs.productSelect.value) { refs.productSelect.value = '---altro---'; gestisciSelezioneProdotto(); refs.productInput.value = prod.prodotto; } else { gestisciSelezioneProdotto(); } refs.quantity.value = formattaNumero(prod.quantita, prod.unita); refs.unit.value = prod.unita; refs.editId.value = prod.id; refs.formTitle.textContent = 'Modifica Voce'; refs.submitBtn.textContent = 'Salva Modifiche'; window.scrollTo(0, 0); } if (target.classList.contains('cancella-btn')) { if (confirm('Sei sicuro di voler cancellare questa voce?')) { data.produzioni = data.produzioni.filter(p => p.id != id); salvaDati(); aggiornaUI(); } } };
    const gestisciNavigazione = (azione) => { if (azione === 'today') { data.dataRif = new Date(); } else { const step = (azione === 'prev') ? -1 : 1; if (data.vistaCorrente === 'week') data.dataRif.setDate(data.dataRif.getDate() + (7 * step)); if (data.vistaCorrente === 'month') data.dataRif.setMonth(data.dataRif.getMonth() + step); if (data.vistaCorrente === 'year') data.dataRif.setFullYear(data.dataRif.getFullYear() + step); } aggiornaUI(); };
    const gestisciCambioVista = (vista) => { data.vistaCorrente = vista; Object.values(refs.viewButtons).forEach(btn => btn.classList.remove('active')); refs.viewButtons[vista].classList.add('active'); aggiornaUI(); };
    const aggiornaUI = () => { const anno = data.dataRif.getFullYear(); const mese = data.dataRif.getMonth(); const inizioSettimana = new Date(data.dataRif); inizioSettimana.setDate(inizioSettimana.getDate() - (inizioSettimana.getDay() === 0 ? 6 : inizioSettimana.getDay() - 1)); inizioSettimana.setHours(0, 0, 0, 0); const fineSettimana = new Date(inizioSettimana); fineSettimana.setDate(inizioSettimana.getDate() + 6); fineSettimana.setHours(23, 59, 59, 999); data.filtrati.week = data.produzioni.filter(p => { const d = new Date(p.data); d.setHours(12, 0, 0, 0); return d >= inizioSettimana && d <= fineSettimana; }); data.filtrati.month = data.produzioni.filter(p => { const d = new Date(p.data); return d.getFullYear() === anno && d.getMonth() === mese; }); data.filtrati.year = data.produzioni.filter(p => new Date(p.data).getFullYear() === anno); const vista = data.vistaCorrente; const datiVistaCorrente = data.filtrati[vista]; let titolo = '', sottotitolo = ''; if (vista === 'week') { titolo = 'Riepilogo Settimanale'; sottotitolo = `Da ${inizioSettimana.toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit' })} a ${fineSettimana.toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit' })}`; } else if (vista === 'month') { titolo = 'Riepilogo Mensile'; sottotitolo = new Date(anno, mese).toLocaleString('it-IT', { month: 'long', year: 'numeric' }).toUpperCase(); } else if (vista === 'year') { titolo = 'Riepilogo Annuale'; sottotitolo = anno.toString(); } refs.riepilogoTitolo.textContent = titolo; refs.riepilogoSottotitolo.textContent = sottotitolo; const totali = calcolaTotali(datiVistaCorrente); refs.riepilogoElementi.kgPv.textContent = formattaNumero(totali.puntiVenditaKg, 'Kg'); refs.riepilogoElementi.pzPv.textContent = formattaNumero(totali.puntiVenditaPz, 'Pz'); refs.riepilogoElementi.kgBisc.textContent = formattaNumero(totali.biscottiKg, 'Kg'); refs.riepilogoElementi.pzBisc.textContent = formattaNumero(totali.biscottiPz, 'Pz'); aggiornaListaDettaglio(); };
    const aggiornaListaDettaglio = () => { const datiDaVisualizzare = data.filtrati[data.vistaCorrente]; refs.list.innerHTML = ''; if (!datiDaVisualizzare || datiDaVisualizzare.length === 0) { refs.list.innerHTML = '<li class="nessuna-voce">Nessuna produzione per questo periodo.</li>'; return; } const produzioniPerGiorno = datiDaVisualizzare.reduce((acc, prod) => { const giorno = prod.data; if (!acc[giorno]) acc[giorno] = []; acc[giorno].push(prod); return acc; }, {}); for (const giorno in produzioniPerGiorno) { const dataFormattata = new Date(giorno).toLocaleDateString('it-IT', { weekday: 'long', day: '2-digit', month: 'long' }); let vociHtml = ''; produzioniPerGiorno[giorno].forEach(prod => { vociHtml += ` <div class="voce-produzione"> <span>${prod.prodotto}: <b>${formattaNumero(prod.quantita, prod.unita)} ${prod.unita}</b></span> <div class="bottoni-voce"> <button class="modifica-btn" data-id="${prod.id}">Modifica</button> <button class="cancella-btn" data-id="${prod.id}">Cancella</button> </div> </div> `; }); refs.list.innerHTML += ` <li class="gruppo-giorno"> <div class="header-giorno"> <h4>${dataFormattata}</h4> <button class="gestisci-giorno-btn" data-data="${giorno}">Gestisci Voci</button> </div> <div class="voci-giorno" data-data="${giorno}"> ${vociHtml} </div> </li> `; } };
    const calcolaTotali = (dati) => { if (!dati) return { puntiVenditaKg: 0, puntiVenditaPz: 0, biscottiKg: 0, biscottiPz: 0 }; return dati.reduce((acc, p) => { if (p.categoria === 'Punti Vendita') { if (p.unita === 'Kg') acc.puntiVenditaKg += p.quantita; else acc.puntiVenditaPz += p.quantita; } else if (p.categoria === 'Biscotti') { if (p.unita === 'Kg') acc.biscottiKg += p.quantita; else acc.biscottiPz += p.quantita; } return acc; }, { puntiVenditaKg: 0, puntiVenditaPz: 0, biscottiKg: 0, biscottiPz: 0 }); };
    const analizzaProdotti = () => { const dati = data.filtrati[data.vistaCorrente]; if (!dati || dati.length === 0) { alert('Nessun dato da analizzare per questo periodo.'); return; } const totaliPerProdotto = dati.reduce((acc, p) => { if (!acc[p.prodotto]) { acc[p.prodotto] = { kg: 0, pezzi: 0, categoria: p.categoria }; } if (p.unita === 'Kg') acc[p.prodotto].kg += p.quantita; else acc[p.prodotto].pezzi += p.quantita; return acc; }, {}); const prodottiOrdinati = Object.entries(totaliPerProdotto).sort((a, b) => a[0].localeCompare(b[0])); const puntiVendita = prodottiOrdinati.filter(([_, value]) => value.categoria === 'Punti Vendita'); const biscotti = prodottiOrdinati.filter(([_, value]) => value.categoria === 'Biscotti'); let html = ''; if (puntiVendita.length > 0) { html += '<h4 class="analisi-categoria">Punti Vendita</h4>'; puntiVendita.forEach(([nome, totali]) => { const totaleStringa = totali.kg > 0 ? `<b>${formattaNumero(totali.kg, 'Kg')}</b> Kg` : `<b>${formattaNumero(totali.pezzi, 'Pezzi')}</b> Pezzi`; html += `<div class="analisi-prodotto"><span>${nome}</span><span>${totaleStringa}</span></div>`; }); } if (biscotti.length > 0) { html += '<h4 class="analisi-categoria">Biscotti</h4>'; biscotti.forEach(([nome, totali]) => { const totaleStringa = totali.kg > 0 ? `<b>${formattaNumero(totali.kg, 'Kg')}</b> Kg` : `<b>${formattaNumero(totali.pezzi, 'Pezzi')}</b> Pezzi`; html += `<div class="analisi-prodotto"><span>${nome}</span><span>${totaleStringa}</span></div>`; }); } refs.analisiModalLista.innerHTML = html; refs.analisiModalTitolo.textContent = `Analisi Prodotti: ${refs.riepilogoSottotitolo.textContent}`; refs.analisiModal.style.display = 'flex'; };
    const generaPdf = (tipo, nomeVisualizzato) => { const { jsPDF } = window.jspdf; const doc = new jsPDF('p', 'mm', 'a4'); const dati = data.filtrati[tipo]; doc.setFontSize(18); doc.text(`Riepilogo Produzione ${nomeVisualizzato}`, 14, 20); doc.setFontSize(12); doc.text(refs.riepilogoSottotitolo.textContent, 14, 27); const totali = calcolaTotali(dati); const corpoTabellaTotali = [ ['Punti Vendita (Kg)', formattaNumero(totali.puntiVenditaKg, 'Kg')],['Punti Vendita (Pz)', formattaNumero(totali.puntiVenditaPz, 'Pz')], ['Biscotti (Kg)', formattaNumero(totali.biscottiKg, 'Kg')],['Biscotti (Pz)', formattaNumero(totali.biscottiPz, 'Pz')] ]; doc.autoTable({ startY: 35, head: [['Riepilogo Categorie', 'Totale']], body: corpoTabellaTotali, theme: 'striped', headStyles: { fillColor: [0, 86, 179] } }); const datiPuntiVendita = dati.filter(p => p.categoria === 'Punti Vendita'); const datiBiscotti = dati.filter(p => p.categoria === 'Biscotti'); if (datiPuntiVendita.length > 0) { const corpoTabellaPv = datiPuntiVendita.map(p => [new Date(p.data).toLocaleDateString('it-IT'), p.prodotto, `${formattaNumero(p.quantita, p.unita)} ${p.unita}`]); doc.autoTable({ head: [['Data', 'Dettaglio Punti Vendita', 'Quantità']], body: corpoTabellaPv, theme: 'grid', headStyles: { fillColor: [40, 167, 69] } }); } if (datiBiscotti.length > 0) { const corpoTabellaBiscotti = datiBiscotti.map(p => [new Date(p.data).toLocaleDateString('it-IT'), p.prodotto, `${formattaNumero(p.quantita, p.unita)} ${p.unita}`]); doc.autoTable({ head: [['Data', 'Dettaglio Prodotti', 'Quantità']], body: corpoTabellaBiscotti, theme: 'grid', headStyles: { fillColor: [255, 193, 7] } }); } const nomeFile = `Riepilogo_${nomeVisualizzato}_${new Date().toISOString().split('T')[0]}.pdf`; doc.save(nomeFile); };
    const esportaCSV = () => { const dati = data.filtrati[data.vistaCorrente]; if (!dati || dati.length === 0) { alert('Nessun dato da esportare per questo periodo.'); return; } const csvRows = []; const headers = ['Data', 'Categoria', 'Prodotto', 'Quantita', 'UnitaDiMisura']; csvRows.push(headers.join(',')); for (const p of dati) { const quantitaFormattata = p.quantita.toString().replace('.', ','); const row = [p.data, p.categoria, `"${p.prodotto.replace(/"/g, '""')}"`, quantitaFormattata, p.unita]; csvRows.push(row.join(',')); } const csvString = csvRows.join('\n'); const blob = new Blob([`\uFEFF${csvString}`], { type: 'text/csv;charset=utf-8;' }); const nomeFile = `esportazione_${data.vistaCorrente}_${new Date().toISOString().split('T')[0]}.csv`; const link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.setAttribute('download', nomeFile); document.body.appendChild(link); link.click(); document.body.removeChild(link); };

    // --- NUOVA LOGICA PER GESTIONE INSTALLAZIONE ---
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        if (refs.installBtn) refs.installBtn.style.display = 'block';
    });

    const gestisciInstallazioneAndroid = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') refs.installBtn.style.display = 'none';
            deferredPrompt = null;
        } else {
            // Se non c'è il prompt, mostra comunque le istruzioni generiche
            refs.installModal.style.display = 'flex';
        }
    };
    
    // NUOVA FUNZIONE PER MOSTRARE ISTRUZIONI SU IOS
    const gestisciInstallazioneIOS = () => {
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        const isInStandaloneMode = ('standalone' in window.navigator) && (window.navigator.standalone);
        const haVistoIstruzioni = localStorage.getItem('haVistoIstruzioniIOS');

        if (isIOS && !isInStandaloneMode && !haVistoIstruzioni) {
            refs.installModal.style.display = 'flex';
            localStorage.setItem('haVistoIstruzioniIOS', 'true');
        }
    };
    
    // --- COLLEGAMENTO DEGLI EVENTI ---
    refs.form.addEventListener('submit', gestisciSubmitForm);
    refs.list.addEventListener('click', gestisciClickLista);
    refs.category.addEventListener('change', gestisciCambioCategoria);
    refs.productSelect.addEventListener('change', gestisciSelezioneProdotto);
    refs.navPrev.addEventListener('click', () => gestisciNavigazione('prev'));
    refs.navNext.addEventListener('click', () => gestisciNavigazione('next'));
    refs.navToday.addEventListener('click', () => gestisciNavigazione('today'));
    refs.stampaBtn.addEventListener('click', () => { const vista = data.vistaCorrente; const nomeVista = refs.viewButtons[vista].textContent; generaPdf(vista, nomeVista); });
    refs.viewButtons.week.addEventListener('click', () => gestisciCambioVista('week'));
    refs.viewButtons.month.addEventListener('click', () => gestisciCambioVista('month'));
    refs.viewButtons.year.addEventListener('click', () => gestisciCambioVista('year'));
    if (refs.installBtn) refs.installBtn.addEventListener('click', gestisciInstallazioneAndroid);
    if (refs.closeModalBtn) refs.closeModalBtn.addEventListener('click', () => { refs.installModal.style.display = 'none'; });
    refs.analizzaBtn.addEventListener('click', analizzaProdotti);
    refs.analisiModalCloseBtn.addEventListener('click', () => { refs.analisiModal.style.display = 'none'; });
    refs.analisiModal.addEventListener('click', (event) => { if(event.target === refs.analisiModal) { refs.analisiModal.style.display = 'none'; } });
    refs.esportaBtn.addEventListener('click', esportaCSV);

    // --- AVVIO APPLICAZIONE ---
    caricaDati();
    resettaForm();
    aggiornaUI();
    gestisciInstallazioneIOS(); // Esegui il controllo per iOS all'avvio
});
