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
        weekSub: document.getElementById('intervallo-settimana'),
        monthSub: document.getElementById('mese-corrente'),
        yearSub: document.getElementById('anno-corrente'),
        weekElements: { kgPv: document.getElementById('tot-pv-sett-kg'), pzPv: document.getElementById('tot-pv-sett-pz'), kgBisc: document.getElementById('tot-bisc-sett-kg'), pzBisc: document.getElementById('tot-bisc-sett-pz') },
        monthElements: { kgPv: document.getElementById('tot-pv-mese-kg'), pzPv: document.getElementById('tot-pv-mese-pz'), kgBisc: document.getElementById('tot-bisc-mese-kg'), pzBisc: document.getElementById('tot-bisc-mese-pz') },
        yearElements: { kgPv: document.getElementById('tot-pv-anno-kg'), pzPv: document.getElementById('tot-pv-anno-pz'), kgBisc: document.getElementById('tot-bisc-anno-kg'), pzBisc: document.getElementById('tot-bisc-anno-pz') },
        navButtons: { 
            prevWeek: document.getElementById('prev-week'), todayWeek: document.getElementById('today-week'), nextWeek: document.getElementById('next-week'),
            prevMonth: document.getElementById('prev-month'), todayMonth: document.getElementById('today-month'), nextMonth: document.getElementById('next-month'),
            prevYear: document.getElementById('prev-year'), todayYear: document.getElementById('today-year'), nextYear: document.getElementById('next-year')
        },
        printButtons: {
            week: document.getElementById('stampa-settimana'),
            month: document.getElementById('stampa-mese'),
            year: document.getElementById('stampa-anno')
        },
        installBtn: document.getElementById('install-button'),
        installModal: document.getElementById('install-instructions-modal'),
        closeModalBtn: document.getElementById('close-modal-btn'),
    };

    // 2. STATO DELL'APPLICAZIONE
    const CATALOGO_VERSIONE = '5.0';
    let data = {
        produzioni: [],
        catalogo: {},
        dataRif: new Date(),
        filtrati: { settimana: [], mese: [], anno: [] }
    };

    const catalogoDefault = {
        "Mondadori": { categoria: "Punti Vendita", unita: "Kg" }, "Palazzolo": { categoria: "Punti Vendita", unita: "Kg" }, "Osio": { categoria: "Punti Vendita", unita: "Kg" }, "Cassano": { categoria: "Punti Vendita", unita: "Kg" }, "Carugate": { categoria: "Punti Vendita", unita: "Kg" }, "Negozio": { categoria: "Punti Vendita", unita: "Kg" }, "Ordini": { categoria: "Punti Vendita", unita: "Kg" },
        "Esse": { categoria: "Biscotti", unita: "Kg" }, "Viennesi": { categoria: "Biscotti", unita: "Kg" }, "Pertikus": { categoria: "Biscotti", unita: "Kg" }, "Canestrelli": { categoria: "Biscotti", unita: "Kg" }, "Sablè Burro": { categoria: "Biscotti", unita: "Kg" }, "Baci Dama": { categoria: "Biscotti", unita: "Kg" }, "Piemontesi": { categoria: "Biscotti", unita: "Kg" }, "Sablè Cara": { categoria: "Biscotti", unita: "Kg" }, "Mini Bresciani": { categoria: "Biscotti", unita: "Kg" }, "Pan Turco": { categoria: "Biscotti", unita: "Kg" },
        "Fave": { categoria: "Biscotti", unita: "Pezzi" }, "Pane dei morti": { categoria: "Biscotti", unita: "Pezzi" }
    };

    const salvaDati = () => {
        const appData = {
            produzioni: data.produzioni,
            catalogo: data.catalogo,
            catalogoVersione: CATALOGO_VERSIONE
        };
        localStorage.setItem('graficoProduzioneData', JSON.stringify(appData));
    };

    const caricaDati = () => {
        const appData = JSON.parse(localStorage.getItem('graficoProduzioneData')) || {};
        data.produzioni = appData.produzioni || [];
        if (appData.catalogoVersione !== CATALOGO_VERSIONE) {
            data.catalogo = { ...catalogoDefault, ...(appData.catalogo || {}) };
        } else {
            data.catalogo = appData.catalogo || catalogoDefault;
        }
        salvaDati();
    };

    const formattaNumero = (num, unita) => (unita === 'Pz') ? Math.round(num).toString() : num.toFixed(1).replace('.', ',');
    const setDefaultDate = () => { refs.date.value = new Date().toISOString().split('T')[0]; };

    const popolaProdottiSelect = (categoria) => {
        refs.productSelect.innerHTML = '<option value="" disabled selected>-- Seleziona --</option>';
        Object.keys(data.catalogo).sort().forEach(nome => {
            if (data.catalogo[nome].categoria === categoria) {
                refs.productSelect.innerHTML += `<option value="${nome}">${nome}</option>`;
            }
        });
        refs.productSelect.innerHTML += '<option value="---altro---">--- Altro (digita nuovo) ---</option>';
    };

    const resettaForm = () => {
        refs.form.reset();
        refs.editId.value = '';
        refs.formTitle.textContent = 'Aggiungi Voce';
        refs.submitBtn.textContent = 'Aggiungi';
        setDefaultDate();
        refs.productSelectWrapper.classList.add('hidden');
        refs.productInputWrapper.classList.add('hidden');
        refs.productLabel.textContent = 'Nome Prodotto/Punto Vendita:';
        refs.productSelect.innerHTML = '';
        refs.category.value = '';
    };

    const gestisciCambioCategoria = () => {
        const categoriaSelezionata = refs.category.value;
        refs.unit.value = 'Kg';
        refs.productSelectWrapper.classList.add('hidden');
        refs.productInputWrapper.classList.add('hidden');
        if (categoriaSelezionata) {
            refs.productLabel.textContent = (categoriaSelezionata === "Punti Vendita") ? "Punto Vendita:" : "Nome Prodotto:";
            refs.productSelectWrapper.classList.remove('hidden');
            popolaProdottiSelect(categoriaSelezionata);
        }
    };
  const gestisciSelezioneProdotto = () => {
        const prodottoSelezionato = refs.productSelect.value;
        if (prodottoSelezionato === '---altro---') {
            refs.productInputWrapper.classList.remove('hidden');
            refs.productInput.value = '';
            refs.productInput.focus();
            refs.productInputLabel.textContent = (refs.category.value === "Punti Vendita") ? "Nuovo Punto Vendita:" : "Nuovo Prodotto:";
        } else {
            refs.productInputWrapper.classList.add('hidden');
            if (data.catalogo[prodottoSelezionato]) {
                refs.unit.value = data.catalogo[prodottoSelezionato].unita;
            }
        }
    };

    const gestisciSubmitForm = (event) => {
        event.preventDefault(); // Impedisce il popup
        const quantitaStringa = refs.quantity.value.replace(',', '.');
        const quantitaNumero = parseFloat(quantitaStringa);
        if (isNaN(quantitaNumero) || quantitaNumero <= 0) return alert('Per favore, inserisci una quantità valida.');
        let nomeProdotto = (refs.productSelect.value === '---altro---') ? refs.productInput.value.trim() : refs.productSelect.value;
        if (!nomeProdotto) return alert('Per favore, seleziona o inserisci un prodotto/punto vendita.');
        const categoriaSelezionata = refs.category.value;
        const unitaSelezionata = refs.unit.value;
        data.catalogo[nomeProdotto] = { categoria: categoriaSelezionata, unita: unitaSelezionata };
        const idDaModificare = refs.editId.value;
        if (idDaModificare) {
            const index = data.produzioni.findIndex(p => p.id == idDaModificare);
            if (index !== -1) data.produzioni[index] = { ...data.produzioni[index], data: refs.date.value, prodotto: nomeProdotto, quantita: quantitaNumero, categoria: categoriaSelezionata, unita: unitaSelezionata };
        } else {
            data.produzioni.unshift({ id: Date.now(), data: refs.date.value, prodotto: nomeProdotto, quantita: quantitaNumero, categoria: categoriaSelezionata, unita: unitaSelezionata });
        }
        data.produzioni.sort((a, b) => new Date(b.data) - new Date(a.data));
        salvaDati();
        data.dataRif = new Date(refs.date.value);
        aggiornaUI();
        resettaForm();
    };

    const gestisciClickLista = (event) => {
        const target = event.target.closest('button');
        if(!target) return;
        const id = target.dataset.id;
        if (!id) return;
        const prod = data.produzioni.find(p => p.id == id);
        if (!prod) return;
        if (target.classList.contains('modifica-btn')) {
            refs.date.value = prod.data;
            refs.category.value = prod.categoria;
            gestisciCambioCategoria();
            refs.productSelect.value = prod.prodotto;
            if(!refs.productSelect.value){
                 refs.productSelect.value = '---altro---';
                 gestisciSelezioneProdotto();
                 refs.productInput.value = prod.prodotto;
            } else {
                 gestisciSelezioneProdotto();
            }
            refs.quantity.value = formattaNumero(prod.quantita, prod.unita);
            refs.unit.value = prod.unita;
            refs.editId.value = prod.id;
            refs.formTitle.textContent = 'Modifica Voce';
            refs.submitBtn.textContent = 'Salva Modifiche';
            window.scrollTo(0, 0);
        }
        if (target.classList.contains('cancella-btn')) {
            if (confirm('Sei sicuro di voler cancellare questa voce?')) {
                data.produzioni = data.produzioni.filter(p => p.id != id);
                salvaDati();
                aggiornaUI();
            }
        }
    };
    
    const gestisciNavigazione = (event) => {
        const id = event.target.id;
        if (id.includes('today')) data.dataRif = new Date();
        if (id.includes('prev-week')) data.dataRif.setDate(data.dataRif.getDate() - 7);
        if (id.includes('next-week')) data.dataRif.setDate(data.dataRif.getDate() + 7);
        if (id.includes('prev-month')) data.dataRif.setMonth(data.dataRif.getMonth() - 1);
        if (id.includes('next-month')) data.dataRif.setMonth(data.dataRif.getMonth() + 1);
        if (id.includes('prev-year')) data.dataRif.setFullYear(data.dataRif.getFullYear() - 1);
        if (id.includes('next-year')) data.dataRif.setFullYear(data.dataRif.getFullYear() + 1);
        aggiornaUI();
    };

    const aggiornaUI = () => {
        const anno = data.dataRif.getFullYear();
        const mese = data.dataRif.getMonth();
        const giorno = data.dataRif.getDate();
        const primoGiornoMese = new Date(anno, mese, 1);
        const offset = (primoGiornoMese.getDay() === 0) ? 6 : primoGiornoMese.getDay() - 1;
        const settimanaDelMese = Math.floor((giorno + offset - 1) / 7);
        let inizioGiornoSett = settimanaDelMese * 7 - offset + 1;
        if (inizioGiornoSett < 1) inizioGiornoSett = 1;
        let fineGiornoSett = inizioGiornoSett + 6;
        const ultimoGiornoMese = new Date(anno, mese + 1, 0).getDate();
        if (fineGiornoSett > ultimoGiornoMese) fineGiornoSett = ultimoGiornoMese;
        const primoGiornoSettimana = new Date(anno, mese, inizioGiornoSett);
        primoGiornoSettimana.setHours(0,0,0,0);
        const ultimoGiornoSettimana = new Date(anno, mese, fineGiornoSett);
        ultimoGiornoSettimana.setHours(23,59,59,999);
        data.filtrati.settimana = data.produzioni.filter(p => { const d = new Date(p.data); d.setHours(12,0,0,0); return d >= primoGiornoSettimana && d <= ultimoGiornoSettimana; });
        data.filtrati.mese = data.produzioni.filter(p => { const d = new Date(p.data); return d.getFullYear() === anno && d.getMonth() === mese; });
        data.filtrati.anno = data.produzioni.filter(p => new Date(p.data).getFullYear() === anno);
        aggiornaListaDettaglio(data.filtrati.settimana);
        aggiornaBoxRiepilogo(data.filtrati.settimana, refs.weekElements);
        aggiornaBoxRiepilogo(data.filtrati.mese, refs.monthElements);
        aggiornaBoxRiepilogo(data.filtrati.anno, refs.yearElements);
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        refs.weekSub.textContent = `Da ${primoGiornoSettimana.toLocaleDateString('it-IT', options)} a ${ultimoGiornoSettimana.toLocaleDateString('it-IT', options)}`;
        refs.monthSub.textContent = new Date(anno, mese).toLocaleString('it-IT', { month: 'long', year: 'numeric' }).toUpperCase();
        refs.yearSub.textContent = anno;
    };

    const aggiornaListaDettaglio = (dati) => {
        refs.list.innerHTML = '';
        if (dati.length === 0) {
            refs.list.innerHTML = '<li>Nessuna produzione per questo periodo.</li>';
            return;
        }
        dati.forEach(prod => {
            const dataFormattata = new Date(prod.data).toLocaleDateString('it-IT', { weekday: 'short', day: '2-digit', month: '2-digit' });
            refs.list.innerHTML += `<li><span>${dataFormattata} - ${prod.prodotto}: ${formattaNumero(prod.quantita, prod.unita)} ${prod.unita}</span><div><button class="modifica-btn" data-id="${prod.id}">Modifica</button><button class="cancella-btn" data-id="${prod.id}">Cancella</button></div></li>`;
        });
    };

    const aggiornaBoxRiepilogo = (dati, elementi) => {
        const totali = calcolaTotali(dati);
        elementi.kgPv.textContent = formattaNumero(totali.puntiVenditaKg, 'Kg');
        elementi.pzPv.textContent = formattaNumero(totali.puntiVenditaPz, 'Pz');
        elementi.kgBisc.textContent = formattaNumero(totali.biscottiKg, 'Kg');
        elementi.pzBisc.textContent = formattaNumero(totali.biscottiPz, 'Pz');
        return totali;
    };
    
    const popolaProdottiSelect = (categoria) => {
        refs.productSelect.innerHTML = '<option value="" disabled selected>-- Seleziona --</option>';
        Object.keys(data.catalogo).sort().forEach(nome => {
            if (data.catalogo[nome].categoria === categoria) {
                refs.productSelect.innerHTML += `<option value="${nome}">${nome}</option>`;
            }
        });
        refs.productSelect.innerHTML += '<option value="---altro---">--- Altro (digita nuovo) ---</option>';
    };

    const calcolaTotali = (dati) => {
        const totali = { puntiVenditaKg: 0, puntiVenditaPz: 0, biscottiKg: 0, biscottiPz: 0 };
        dati.forEach(p => {
            if (p.categoria === 'Punti Vendita') {
                if (p.unita === 'Kg') totali.puntiVenditaKg += p.quantita; else totali.puntiVenditaPz += p.quantita;
            } else if (p.categoria === 'Biscotti') {
                if (p.unita === 'Kg') totali.biscottiKg += p.quantita; else totali.biscottiPz += p.quantita;
            }
        });
        return totali;
    };
    
    const generaPdf = (tipo, dataRif, dati) => {
        // Implementazione PDF
    };
    
    let deferredPrompt;
    if (window.matchMedia('(display-mode: standalone)').matches === false) { installButton.style.display = 'block'; }
    window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); deferredPrompt = e; installButton.style.display = 'block'; });
    async function gestisciInstallazione() {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') { installButton.style.display = 'none'; }
            deferredPrompt = null;
        } else { installModal.style.display = 'flex'; }
    }
    installButton.addEventListener('click', gestisciInstallazione);
    if(closeModalBtn) closeModalBtn.addEventListener('click', () => { installModal.style.display = 'none'; });
    
    caricaDati();
    resettaForm();
    aggiornaUI();
});
</script>

</body>
</html>
