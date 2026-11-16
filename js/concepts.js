/* Session 04 learning interactions. These visual models do not execute C# or SQL. */
(function () {
  'use strict';
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const resets = [];
  const guide = window.S4CodeGuide;
  const esc = value => String(value).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const setChoice = (selector,attribute,value) => $$(selector).forEach(button=>{
    const active=button.getAttribute(attribute)===String(value);
    button.setAttribute('aria-pressed',String(active));button.classList.toggle('primary',active);
  });

  // Use the exact same immutable teaching fixture as the query simulation.
  const rows=window.S4InventorySimulation.rows('all');
  const picker=$('#s4-orm-row');
  rows.forEach(row=>{const option=document.createElement('option');option.value=String(row.Id);option.textContent=`${row.Id} · ${row.Name}`;picker.append(option);});
  let selectedId=3, stage=0;
  function renderRow(){
    const row=rows.find(r=>r.Id===selectedId);
    $('#s4-row-id').textContent=String(row.Id);$('#s4-row-name').textContent=row.Name;
    const object=$('#s4-object-view');object.replaceChildren();
    const label=document.createElement('strong');label.textContent=stage===2?'Item object from the selected row':'Item class describes the shape';object.append(label);
    const pre=document.createElement('pre'),code=document.createElement('code');
    code.textContent=stage===2?`Item item = new Item\n{\n    Id = ${row.Id},\n    Name = "${row.Name}"\n};`:'public class Item\n{\n    public int Id { get; set; }\n    public string Name { get; set; } = "";\n}';
    pre.append(code);object.append(pre);object.classList.toggle('s4-object-ready',stage===2);
    $$('.s4-row-values>div, .s4-selected-row tbody tr').forEach(el=>el.classList.toggle('s4-mapping-active',stage>=1));
    $('[aria-label="Mapping connects columns to properties"]').classList.toggle('s4-mapping-active',stage>=1);
    $$('[data-s4-orm-stage]').forEach(button=>button.setAttribute('aria-current',Number(button.dataset.s4OrmStage)===stage?'step':'false'));
    const explanations=[
      ['Start with stored values',`The selected result row has Id ${row.Id} and Name “${row.Name}”. These values belong to SQL Server data. The class on the right defines a C# shape; this illustration has not filled an object yet.`],
      ['Use the model as the mapping',`The Items DbSet connects the entity to the Items table. Id maps to Id, and Name maps to Name. The integer key identifies the item. These conventions and the model metadata tell EF Core how the two shapes correspond.`],
      ['Fill an object with returned values',`For the first query in our new context, EF Core materialises the returned values into an Item object. The Name property now contains “${row.Name}”. Our foreach can print that property without us writing GetString and an assignment for every row.`]
    ];
    $('#s4-orm-explanation').replaceChildren();
    const h=document.createElement('h3');h.textContent=explanations[stage][0];const p=document.createElement('p');p.textContent=explanations[stage][1];$('#s4-orm-explanation').append(h,p);
  }
  picker.addEventListener('change',()=>{selectedId=Number(picker.value);stage=0;renderRow();});
  $$('[data-s4-orm-stage]').forEach(button=>button.addEventListener('click',()=>{stage=Number(button.dataset.s4OrmStage);renderRow();}));
  resets.push(()=>{selectedId=3;stage=0;picker.value='3';renderRow();});

  function compare(mode){setChoice('[data-s4-compare]','data-s4-compare',mode);$('#s4-compare-ado').hidden=mode!=='ado';$('#s4-compare-ef').hidden=mode!=='ef';}
  $$('[data-s4-compare]').forEach(button=>button.addEventListener('click',()=>compare(button.dataset.s4Compare)));
  resets.push(()=>compare('ado'));

  const workflows={
    database:{intro:'Database First: the database schema drives the model. Reverse engineering can generate the corresponding C# types.',steps:[
      ['Existing schema','Inspect dbo.Items: an int identity primary key called Id, and a required nvarchar(100) Name column. The database structure is already defined.'],
      ['Reverse engineer','EF Core tools inspect the schema and scaffold entity classes plus a DbContext. Scaffolding means generating that starting code; it does not mean running the application query.'],
      ['Review the mapping','Check the generated classes and mapping against the schema. In today’s tiny exercise, we write the equivalent simple mapping by hand so its meaning is visible. We are not presenting that as a completed scaffolding task.'],
      ['Run a query','Configure the provider and context, then execute the same ordered async query. SQL Server executes SQL and EF Core materialises the returned values into objects.']
    ]},
    code:{intro:'Code First: the EF model in code drives schema changes. A migration describes how the database should be brought into line.',steps:[
      ['Define the model','Start with Item, its properties and mapping, and the InventoryDbContext. The model describes the required structure; defining a class alone does not create a table.'],
      ['Create a migration','EF tools compare the model with its previous model snapshot and generate migration code for the required schema changes. Review the proposed change before applying it.'],
      ['Apply the schema change','Apply the reviewed migration to create or update the schema through the agreed process. EF records applied migrations. This describes the Code First workflow; applying migrations is not part of today’s practical.'],
      ['Run a query','Use the configured context to query the table. The ORM mapping and query concepts are the same as when the database was the starting point.']
    ]}
  };
  let workflow='database', workflowStage=0;
  function renderWorkflow(){
    const current=workflows[workflow];setChoice('[data-s4-workflow]','data-s4-workflow',workflow);
    $('#s4-workflow-intro').textContent=current.intro;const ol=$('#s4-workflow-stages');ol.replaceChildren();
    current.steps.forEach((value,i)=>{const li=document.createElement('li'),button=document.createElement('button');button.type='button';button.textContent=`${i+1} · ${value[0]}`;button.setAttribute('aria-current',i===workflowStage?'step':'false');button.addEventListener('click',()=>{workflowStage=i;renderWorkflow();});li.append(button);ol.append(li);});
    const detail=$('#s4-workflow-detail');detail.replaceChildren();const h=document.createElement('h3'),p=document.createElement('p');h.textContent=current.steps[workflowStage][0];p.textContent=current.steps[workflowStage][1];detail.append(h,p);
    $('#s4-workflow-prev').disabled=workflowStage===0;$('#s4-workflow-next').disabled=workflowStage===3;
  }
  $$('[data-s4-workflow]').forEach(button=>button.addEventListener('click',()=>{workflow=button.dataset.s4Workflow;workflowStage=0;renderWorkflow();}));
  $('#s4-workflow-prev').addEventListener('click',()=>{if(workflowStage>0)workflowStage--;renderWorkflow();});
  $('#s4-workflow-next').addEventListener('click',()=>{if(workflowStage<3)workflowStage++;renderWorkflow();});
  resets.push(()=>{workflow='database';workflowStage=0;renderWorkflow();});
  $$('[data-s4-decision]').forEach(button=>button.addEventListener('click',()=>{
    const choice=button.dataset.s4Decision;setChoice('[data-s4-decision]','data-s4-decision',choice);
    $('#s4-decision-result').textContent=choice==='database'?'Yes. Here the database team controls the schema, so use it as the source of truth and map or reverse-engineer it into the application. Both approaches still use EF Core.':'Reconsider which side owns the schema in this request. Code First makes the EF model drive schema changes; here the database team is authoritative. A project can adopt Code First for an existing database, but that needs an agreed change of workflow.';
  }));
  resets.push(()=>{setChoice('[data-s4-decision]','data-s4-decision','');$('#s4-decision-result').textContent='Choose, then explain where the mapping comes from.';});

  const projects={
    console:['Start this project','EF10_InventoryManager is the runnable Console Application. Program.cs loads the settings, configures the context, executes the query and prints the result. appsettings.json belongs here. Select this project as the startup project or use dotnet run --project EF10_InventoryManager.'],
    data:['Reuse the database-access types','EF10_InventoryDBLibrary is a Class Library. It contains InventoryDbContext and references both the model project and the EF Core SQL Server package. The Console creates its context; this library is not a second program you run.'],
    model:['Reuse the entity definition','EF10_InventoryModels is a Class Library containing Item. Its type describes the application’s entity and carries the annotations. It does not connect to SQL Server or create the table by itself. The database library references it.']
  };
  function renderProject(key){setChoice('[data-s4-project]','data-s4-project',key);const el=$('#s4-project-detail');el.replaceChildren();const h=document.createElement('h3'),p=document.createElement('p');h.textContent=projects[key][0];p.textContent=projects[key][1];el.append(h,p);}
  $$('[data-s4-project]').forEach(button=>button.addEventListener('click',()=>renderProject(button.dataset.s4Project)));
  resets.push(()=>renderProject('console'));

  const annotations={
    namespace:['A namespace supplied by .NET','using System.ComponentModel.DataAnnotations; brings attribute type names into this file’s scope. System.ComponentModel.DataAnnotations is the full namespace. The types include RequiredAttribute and StringLengthAttribute. C# lets us omit the Attribute suffix inside brackets. This directive is not a connection or a project reference.'],
    required:['Required is model metadata here','[Required] attaches information to Name. EF Core uses it to make the property required, corresponding to a NOT NULL column in a relational schema. With nullable reference types enabled, a non-nullable string already communicates that requirement. The explicit annotation follows the book and makes the intent visible. Empty text is not SQL NULL.'],
    length:['100 is the model’s maximum length','[StringLength(100)] supplies the maximum length to the attribute. For this SQL Server model it corresponds to nvarchar(100). It does not prevent C# from assigning longer text, and EF Core does not validate maximum length before passing a value to its provider. Our existing database schema is unchanged until a separate schema operation is performed.'],
    initial:['An initializer, not a database default','public string Name { get; set; } = ""; gives a new C# object an empty string instead of an uninitialised non-nullable reference. This classroom addition handles nullable-enabled C# setup. It does not create a default movie title, validate user input or change the table. Returned row values populate the object when EF reads data.']
  };
  function renderAnnotation(key){setChoice('[data-s4-annotation]','data-s4-annotation',key);const el=$('#s4-annotation-detail');el.replaceChildren();const h=document.createElement('h3'),p=document.createElement('p');h.textContent=annotations[key][0];p.textContent=annotations[key][1];el.append(h,p);}
  $$('[data-s4-annotation]').forEach(button=>button.addEventListener('click',()=>renderAnnotation(button.dataset.s4Annotation)));
  resets.push(()=>renderAnnotation('namespace'));

  // An accessible line picker: one tab stop in the code, with arrow-key movement.
  $$('.s4-code-tour').forEach((host,index)=>{
    const support=host.dataset.s4CodeTour==='support';let fileId=support?'project-console':host.dataset.s4CodeTour;
    const select=document.createElement('select');select.id=`s4-guide-select-${index}`;
    if(support){
      const label=document.createElement('label');label.className='s4-field-label';label.htmlFor=select.id;label.textContent='Choose a supplied file';host.append(label,select);
      ['project-console','project-data','project-model','props','settings','setup','verify','program','item','context','practice'].forEach(id=>{const option=document.createElement('option');option.value=id;option.textContent=guide[id].label;select.append(option);});
    }
    const origin=document.createElement('p');origin.className='s4-code-origin small';host.append(origin);
    const layout=document.createElement('div');layout.className='s4-line-layout';const lines=document.createElement('ol');lines.className='s4-code-lines';lines.setAttribute('aria-label','Code line picker');const note=document.createElement('div');note.className='s4-line-note';note.setAttribute('aria-live','polite');layout.append(lines,note);host.append(layout);
    let active=0,buttons=[];
    function explain(n,focus=false){
      active=n;buttons.forEach(({button,i})=>{const current=i===n;button.setAttribute('aria-pressed',String(current));button.tabIndex=current?0:-1;});
      const item=guide[fileId].lines[n];note.replaceChildren();const h=document.createElement('h3');h.textContent=`Line ${n+1}`;const c=document.createElement('code');c.className='s4-selected-code';c.textContent=item.code.trim();const p=document.createElement('p');p.textContent=item.explain;const a=document.createElement('a');a.href=item.url;a.textContent='Microsoft documentation · '+item.source;note.append(h,c,p,a);
      if(focus){const chosen=buttons.find(x=>x.i===n);chosen.button.focus();chosen.button.scrollIntoView({block:'nearest',inline:'nearest'});}
    }
    function renderCode(){
      origin.textContent=guide[fileId].origin;lines.replaceChildren();buttons=[];
      guide[fileId].lines.forEach((item,i)=>{
        const li=document.createElement('li');if(!item.code.trim()){li.className='s4-code-gap';li.setAttribute('aria-hidden','true');li.textContent=' ';lines.append(li);return;}
        const button=document.createElement('button');button.type='button';button.className='s4-code-line';button.setAttribute('aria-label',`Line ${i+1}: ${item.code.trim()}`);const num=document.createElement('span');num.className='s4-line-number';num.setAttribute('aria-hidden','true');num.textContent=String(i+1).padStart(2,'0');const c=document.createElement('code');c.textContent=item.code;button.append(num,c);button.addEventListener('click',()=>explain(i));
        button.addEventListener('keydown',event=>{let next=null;const pos=buttons.findIndex(x=>x.i===i);if(event.key==='ArrowDown')next=buttons[Math.min(pos+1,buttons.length-1)].i;if(event.key==='ArrowUp')next=buttons[Math.max(pos-1,0)].i;if(event.key==='Home')next=buttons[0].i;if(event.key==='End')next=buttons[buttons.length-1].i;if(next!==null){event.preventDefault();explain(next,true);}});
        li.append(button);lines.append(li);buttons.push({button,i});
      });
      explain(buttons[0].i);
    }
    select.addEventListener('change',()=>{fileId=select.value;renderCode();});
    resets.push(()=>{fileId=support?'project-console':host.dataset.s4CodeTour;if(support)select.value=fileId;renderCode();});
  });
  const reset=()=>resets.forEach(fn=>fn());document.addEventListener('s4:reset',reset);reset();
})();
