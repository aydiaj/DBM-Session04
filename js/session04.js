(function () {
  'use strict';
  const KEY = 'dbm-session04-ef-inventory-v1';
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const fresh = () => ({ version: 1, step: 0, complete: [], fields: {}, quiz: {}, graded: {}, theme: 'light' });
  let state = fresh(), storageOK = true, toastTimer;
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (saved && saved.version === 1) {
      state.step = Number.isInteger(saved.step) && saved.step >= 0 && saved.step < 8 ? saved.step : 0;
      state.complete = Array.isArray(saved.complete) ? [...new Set(saved.complete.filter(n => Number.isInteger(n) && n >= 0 && n < 8))] : [];
      for (const key of ['fields','quiz','graded']) {
        if (saved[key] && typeof saved[key] === 'object' && !Array.isArray(saved[key])) state[key] = saved[key];
      }
      state.theme = saved.theme === 'dark' ? 'dark' : 'light';
    }
  } catch (_) { storageOK = false; }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); }
    catch (_) { storageOK = false; }
    $('#s4-storage-status').textContent = storageOK
      ? 'Progress and notes save on this device.'
      : 'Device storage unavailable. Export your notes before closing.';
  }
  function toast(message) {
    const el = $('#s4-toast'); el.textContent = message; el.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('show'), 3500);
  }
  function theme() {
    document.body.dataset.theme = state.theme;
    const dark = state.theme === 'dark';
    $('#s4-theme').setAttribute('aria-pressed', String(dark));
    $('#s4-theme').setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
  }
  const mobile = window.matchMedia('(max-width:1000px)');
  function menu(open) {
    open = open && mobile.matches;
    document.body.classList.toggle('nav-open', open);
    $('#s4-scrim').hidden = !open;
    $('#s4-menu').setAttribute('aria-expanded', String(open));
    $('.workspace').inert = open;
    $('#s4-sidebar').inert = mobile.matches && !open;
    if (mobile.matches) $('#s4-sidebar').setAttribute('aria-hidden', String(!open));
    else $('#s4-sidebar').removeAttribute('aria-hidden');
    if (open) $('#s4-close').focus();
  }
  function paintProgress() {
    const count = state.complete.length;
    $('#s4-progress-text').textContent = `${count} / 8`;
    $('#s4-progress-fill').style.width = `${count / 8 * 100}%`;
    $('#s4-progress').setAttribute('aria-valuenow', String(count));
    $$('.step-link').forEach((el, i) => el.classList.toggle('done', state.complete.includes(i)));
    $$('[data-complete]').forEach(el => {
      const done = state.complete.includes(Number(el.dataset.complete));
      el.setAttribute('aria-pressed', String(done));
      el.textContent = done ? '✓ Step complete · undo' : '✓ Mark step complete';
    });
  }
  function showStep(step, focus = true) {
    if (!Number.isInteger(step) || step < 0 || step > 7) return;
    state.step = step;
    $$('.lesson').forEach((el, i) => { el.hidden = i !== step; el.classList.toggle('active', i === step); });
    $$('.step-link').forEach((el, i) => {
      el.classList.toggle('active', i === step);
      if (i === step) el.setAttribute('aria-current', 'step');
      else el.removeAttribute('aria-current');
    });
    menu(false); paintProgress(); save();
    if (focus) {
      window.scrollTo({top:0, behavior:'instant'});
      $(`#s4-title-${step}`).focus({preventScroll:true});
    }
  }
  $$('.step-link').forEach(el => el.addEventListener('click', () => showStep(Number(el.dataset.step))));
  $$('[data-prev]').forEach(el => el.addEventListener('click', () => showStep(state.step - 1)));
  $$('[data-next]').forEach(el => el.addEventListener('click', () => showStep(state.step + 1)));
  $$('[data-complete]').forEach(el => el.addEventListener('click', () => {
    const step = Number(el.dataset.complete);
    if (state.complete.includes(step)) state.complete = state.complete.filter(n => n !== step);
    else state.complete.push(step);
    save(); paintProgress();
    toast(state.complete.length === 8 ? 'All eight steps marked complete. Remember your real C# submission.' : 'Progress saved. Use Next when ready.');
  }));
  $('#s4-menu').addEventListener('click', () => menu(true));
  for (const id of ['s4-close','s4-scrim']) $(`#${id}`).addEventListener('click', () => { menu(false); $('#s4-menu').focus(); });
  mobile.addEventListener('change', () => menu(false));
  document.addEventListener('keydown', event => {
    if (!document.body.classList.contains('nav-open')) return;
    if (event.key === 'Escape') { menu(false); $('#s4-menu').focus(); }
    if (event.key === 'Tab') {
      const targets = $$('#s4-sidebar button, #s4-sidebar a').filter(el => el.offsetParent !== null && !el.disabled);
      const first = targets[0], last = targets[targets.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
  $('#s4-theme').addEventListener('click', () => { state.theme = state.theme === 'dark' ? 'light' : 'dark'; theme(); save(); });
  $('#s4-source-link').addEventListener('click', event => {
    event.preventDefault(); showStep(7, false);
    $('#s4-sources').scrollIntoView({block:'start'});
    $('#s4-sources').setAttribute('tabindex','-1'); $('#s4-sources').focus({preventScroll:true});
  });
  $$('[data-save]').forEach(el => {
    const key = el.dataset.save;
    if (el.type === 'checkbox') el.checked = state.fields[key] === true;
    else el.value = typeof state.fields[key] === 'string' ? state.fields[key] : '';
    el.addEventListener('input', () => {
      state.fields[key] = el.type === 'checkbox' ? el.checked : el.value; save();
    });
  });
  $$('.copy').forEach(button => button.addEventListener('click', async () => {
    const pre = button.closest('.code-shell').querySelector('pre');
    try { await navigator.clipboard.writeText(pre.textContent); toast('Code copied. Paste at the named TODO location.'); }
    catch (_) {
      const selection = window.getSelection(), range = document.createRange();
      range.selectNodeContents(pre); selection.removeAllRanges(); selection.addRange(range);
      toast('Code selected. Use your device’s Copy command.');
    }
  }));
  const quizzes = {
    warmup: [
      { q:'Which ADO.NET object reads returned rows?', a:['SqlDataReader','SqlParameter','The connection string'], correct:0, why:'SqlDataReader reads a result set. The connection string describes the connection; a parameter supplies a value.' },
      { q:'Why use typed parameters with a value in a command?', a:['They remove the need for SQL Server','They keep values separate from SQL command structure','They automatically correct every invalid input'], correct:1, why:'Parameters keep data values separate from command text. Business input validation and database constraints still matter.' },
      { q:'What does a primary key do?', a:['Sorts every query automatically','Identifies a row uniquely','Loads all related rows'], correct:1, why:'A primary key identifies a row uniquely. Use ORDER BY when you require an order.' },
      { q:'Why check for DBNull before reading an optional value?', a:['SQL NULL is not a normal value for a typed getter','All values from SQL are strings','A reader cannot read optional columns'], correct:0, why:'A typed getter such as GetInt32 cannot return SQL NULL as a normal int. Check nullability and use a suitable C# representation.' }
    ],
    exit: [
      { q:'Which statement is accurate?', a:['ORM is EF Core’s SQL Server driver','ORM is an approach; EF Core implements it','EF Core replaces SQL Server'], correct:1, why:'ORM maps between relational data and objects. EF Core is a framework implementing this approach; SqlClient is the underlying driver here.' },
      { q:'Which line fetches the rows in our completed program?', a:['var query = db.Items.OrderBy(item => item.Name);','query.ToQueryString();','await query.ToListAsync();'], correct:2, why:'OrderBy builds the query definition. ToQueryString makes a debugging preview. ToListAsync executes and collects results.' },
      { q:'What is DbSet<Item> Items here?', a:['A query entry point for Item entities','A loaded list of every table in the database','The SQL Server service'], correct:0, why:'The DbSet exposes this entity type for querying. Accessing the property alone does not fetch all its rows.' },
      { q:'In Database First reverse engineering, what is used to generate entity classes and a DbContext?', a:['The existing database schema','The Console output text','The rows already loaded in a List<Item>'], correct:0, why:'Reverse engineering reads the schema to generate a mapping. Our tiny existing-database lesson writes that mapping by hand. Both this route and Code First still use EF Core.' }
    ]
  };
  function renderQuiz(kind) {
    const host = $(`#s4-${kind}`); host.replaceChildren();
    const questions = quizzes[kind];
    questions.forEach((question, i) => {
      const fieldset = document.createElement('fieldset'); fieldset.className = 'quiz-card';
      const legend = document.createElement('legend'); legend.textContent = `${i+1}. ${question.q}`; fieldset.append(legend);
      question.a.forEach((answer,j) => {
        const label = document.createElement('label'), input = document.createElement('input'), text = document.createElement('span');
        label.className = 'answer';
        input.type = 'radio'; input.name = `s4-${kind}-${i}`; input.value = String(j);
        input.checked = state.quiz[`${kind}-${i}`] === j;
        input.addEventListener('change', () => {
          state.quiz[`${kind}-${i}`] = j; state.graded[kind] = false; save();
          host.querySelectorAll('.feedback').forEach(el => el.remove());
          host.querySelector('.quiz-result').textContent = 'Answers changed. Check again for updated feedback.';
        });
        text.textContent = answer; label.append(input,text); fieldset.append(label);
      });
      host.append(fieldset);
    });
    const controls = document.createElement('div'); controls.className = 'button-row';
    const grade = document.createElement('button'); grade.className = 'button s2-btn primary'; grade.textContent = 'Check all answers';
    const retry = document.createElement('button'); retry.className = 'button secondary s2-btn'; retry.textContent = 'Try again';
    const result = document.createElement('span'); result.className = 'quiz-result'; result.setAttribute('role','status');
    grade.addEventListener('click', () => { state.graded[kind] = true; save(); gradeQuiz(kind); });
    retry.addEventListener('click', () => {
      questions.forEach((_,i) => { delete state.quiz[`${kind}-${i}`]; });
      state.graded[kind] = false; save(); renderQuiz(kind); host.querySelector('input').focus();
    });
    controls.append(grade,retry,result); host.append(controls);
    if (state.graded[kind]) gradeQuiz(kind);
  }
  function gradeQuiz(kind) {
    const host = $(`#s4-${kind}`); let score = 0, answered = 0;
    host.querySelectorAll('.feedback').forEach(el => el.remove());
    quizzes[kind].forEach((q,i) => {
      const answer = state.quiz[`${kind}-${i}`];
      const chosen = Number.isInteger(answer) && answer >= 0 && answer < q.a.length;
      if (chosen) answered++;
      const correct = chosen && answer === q.correct; if (correct) score++;
      const feedback = document.createElement('p'); feedback.className = 'feedback';
      feedback.textContent = `${correct ? 'Correct.' : chosen ? 'Review this.' : 'Not answered.'} ${q.why}`;
      host.querySelectorAll('fieldset')[i].append(feedback);
    });
    host.querySelector('.quiz-result').textContent = `${score} / ${quizzes[kind].length} correct · ${answered} answered. Review the explanations, then retry if needed.`;
  }
  renderQuiz('warmup'); renderQuiz('exit');
  // Simulation uses the same fixture/query model as the downloadable setup.
  const sim = window.S4InventorySimulation;
  const stageNames = ['Build query','Preview SQL','Execute','Read rows','Create objects'];
  let simStage = 0, simMode = 'all';
  const esc = value => String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const simCode = value => `<div class="code-shell"><pre tabindex="0"><code>${esc(value)}</code></pre></div>`;
  function renderSim() {
    const value = sim.trace(simMode,simStage);
    $('#s4-sim-stages').replaceChildren();
    stageNames.forEach((name,i) => {
      const li = document.createElement('li'), button = document.createElement('button');
      button.textContent = `${i+1}. ${name}`;
      if (i === simStage) button.setAttribute('aria-current','step');
      button.addEventListener('click', () => { simStage = i; renderSim(); });
      li.append(button); $('#s4-sim-stages').append(li);
    });
    const desc = [
      '<p>The query is a description of the requested order/filter. No database request has been sent and no Item objects have been loaded.</p>'+simCode(value.query),
      '<p>The provider can produce SQL for debugging with ToQueryString. This preview does not send a data-retrieval request. The SQL below is illustrative.</p>'+simCode(value.sql),
      '<p><code>await query.ToListAsync()</code> starts execution. The EF SQL Server provider coordinates a command; Microsoft.Data.SqlClient handles the database communication. SQL Server evaluates the query.</p><p><b>Teaching state:</b> a request has been sent; returned values are shown at the next stage.</p>',
      '<p>SQL Server returns column values, not C# Item objects. The result is sorted by Name.</p>'+(value.rows.length ? '<div class="table-wrap"><table><thead><tr><th scope="col">Id</th><th scope="col">Name</th></tr></thead><tbody>'+value.rows.map(row => `<tr><td>${row.Id}</td><td>${esc(row.Name)}</td></tr>`).join('')+'</tbody></table></div>' : '<p><b>0 rows.</b> No title starts with Z in this snapshot.</p>'),
      '<p>EF Core materialises the returned values into Item objects. After the awaited call completes, the Console loop reads the loaded list. No related entities are loaded by this example.</p>'+`<p><b>List&lt;Item&gt; · ${value.objects.length} objects</b></p>`+(value.objects.length ? '<div class="object-grid">'+value.objects.map((obj,i) => `<div class="object"><strong>Item object ${i+1}</strong><div><code>Id = ${obj.values.Id}</code></div><div><code>Name = "${esc(obj.values.Name)}"</code></div></div>`).join('')+'</div>' : '<p>The list is empty. The output count is 0; the no-match message prints.</p>')
    ];
    $('#s4-sim-detail').innerHTML = `<h3>${simStage+1}. ${stageNames[simStage]}</h3>${desc[simStage]}`;
    $('#s4-sim-back').disabled = simStage === 0;
    $('#s4-sim-next').disabled = simStage === 4;
  }
  $('#s4-sim-mode').addEventListener('change', event => { simMode = event.target.value; simStage = 0; renderSim(); });
  $('#s4-sim-next').addEventListener('click', () => { if(simStage < 4) simStage++; renderSim(); });
  $('#s4-sim-back').addEventListener('click', () => { if(simStage > 0) simStage--; renderSim(); });
  $('#s4-sim-reset').addEventListener('click', () => { simStage = 0; renderSim(); });
  renderSim();
  $('#s4-export').addEventListener('click', () => {
    const lines = ['# DBM Session 04 - Codelab notes','',`Completed steps: ${state.complete.length} / 8`,'','These notes need real C# and SSMS evidence added for submission.',''];
    $$('[data-save]').forEach(el => {
      const label = el.type === 'checkbox' ? el.closest('label').textContent.trim() : document.querySelector(`label[for="${el.id}"]`).textContent.trim();
      lines.push(`## ${label}`,String(state.fields[el.dataset.save] ?? '(not recorded)'),'');
    });
    for (const [kind, questions] of Object.entries(quizzes)) {
      lines.push(`## ${kind === 'warmup' ? 'Prior-knowledge' : 'Review'} check`);
      questions.forEach((q,i) => lines.push(`${i+1}. ${q.q}`,`Answer: ${q.a[state.quiz[`${kind}-${i}`]] ?? '(not answered)'}`));
      lines.push('');
    }
    const url = URL.createObjectURL(new Blob([lines.join('\n')],{type:'text/markdown;charset=utf-8'}));
    const link = document.createElement('a'); link.href = url; link.download = 'DBM_Session04_My_Notes.md'; link.click();
    setTimeout(() => URL.revokeObjectURL(url),1000); toast('Notes exported. Add your actual Console and SSMS evidence.');
  });
  $('#s4-reset').addEventListener('click', () => { menu(false); $('#s4-reset-dialog').showModal(); });
  $('#s4-cancel-reset').addEventListener('click', () => $('#s4-reset-dialog').close());
  $('#s4-confirm-reset').addEventListener('click', () => {
    state = fresh();
    try { localStorage.removeItem(KEY); storageOK = true; } catch (_) { storageOK = false; }
    $$('[data-save]').forEach(el => { if(el.type === 'checkbox') el.checked = false; else el.value = ''; });
    $$('details').forEach(el => { el.open = false; });
    renderQuiz('warmup'); renderQuiz('exit'); simStage = 0; simMode = 'all'; $('#s4-sim-mode').value = 'all'; renderSim();
    $('#s4-reset-dialog').close(); document.dispatchEvent(new Event('s4:reset')); theme(); showStep(0); toast('Session 04 reset. No SQL Server data changed.');
  });
  theme(); showStep(state.step,false); menu(false);
})();
