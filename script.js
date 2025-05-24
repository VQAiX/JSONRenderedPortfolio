// Toggle sections
function toggleSection(sectionId) {
    const section = document.getElementById(`${sectionId}-section`);
    section.classList.toggle('hidden');
    const header = section.previousElementSibling;
    if (section.classList.contains('hidden')) {
        header.innerHTML = header.innerHTML.replace('▼', '▶');
    } else {
        header.innerHTML = header.innerHTML.replace('▶', '▼');
    }
}

// Edit field functionality
function editField(button) {
    const parent = button.parentElement;
    const editableElement = parent.querySelector('.editable');
    
    if (editableElement.getAttribute('contenteditable') === 'true') {
        // Save changes
        editableElement.setAttribute('contenteditable', 'false');
        button.textContent = '✏️';
        saveAllData();
    } else {
        // Enable editing
        editableElement.setAttribute('contenteditable', 'true');
        editableElement.focus();
        button.textContent = '💾';
    }
}

// Add new items functions
function addNewContact() {
    const type = prompt("Əlaqə növünü seçin (phone, email, location, website):");
    if (!type) return;
    
    const value = prompt("Dəyəri daxil edin:");
    if (!value) return;
    
    const list = document.getElementById('contact-list');
    const newItem = document.createElement('li');
    
    let displayText = '';
    switch(type) {
        case 'phone': displayText = `📞 ${value}`; break;
        case 'email': displayText = `📧 ${value}`; break;
        case 'location': displayText = `📍 ${value}`; break;
        case 'website': displayText = `🌐 ${value}`; break;
        default: displayText = value;
    }
    
    newItem.innerHTML = `
        ${displayText}
        <button class="edit-btn" onclick="editField(this)">✏️</button>
        <button class="delete-btn" onclick="this.parentElement.remove()">🗑️</button>
    `;
    list.appendChild(newItem);
}

function addNewEducation() {
    const year = prompt("Təhsil ili:");
    if (!year) return;
    
    const institution = prompt("Təhsil müəssisəsi:");
    if (!institution) return;
    
    const major = prompt("İxtisas:");
    if (!major) return;
    
    const list = document.getElementById('education-list');
    const newItem = document.createElement('div');
    newItem.className = 'education-item';
    newItem.innerHTML = `
        <p><span class="editable" data-field="education-year">${year}</span><br>
        <strong class="editable" data-field="education-institution">${institution}</strong><br>
        <span class="editable" data-field="education-major">${major}</span>
        <button class="edit-btn" onclick="editField(this)">✏️</button>
        <button class="delete-btn" onclick="this.parentElement.parentElement.remove()">🗑️</button></p>
    `;
    list.appendChild(newItem);
}

function addNewSkill() {
    const skill = prompt("Yeni bacarıq:");
    if (!skill) return;
    
    const list = document.getElementById('skills-list');
    const newItem = document.createElement('li');
    newItem.innerHTML = `
        <span class="editable" data-field="skill">${skill}</span>
        <button class="edit-btn" onclick="editField(this)">✏️</button>
        <button class="delete-btn" onclick="this.parentElement.remove()">🗑️</button>
    `;
    list.appendChild(newItem);
}

function addNewLanguage() {
    const language = prompt("Yeni dil:");
    if (!language) return;
    
    const list = document.getElementById('languages-list');
    const newItem = document.createElement('li');
    newItem.innerHTML = `
        <span class="editable" data-field="language">${language}</span>
        <button class="edit-btn" onclick="editField(this)">✏️</button>
        <button class="delete-btn" onclick="this.parentElement.remove()">🗑️</button>
    `;
    list.appendChild(newItem);
}

function addNewKnowledge() {
    const title = prompt("Başlıq:");
    if (!title) return;
    
    const period = prompt("Dövr (məs: 2023 - İndiyə qədər):");
    if (!period) return;
    
    const description = prompt("Təsvir:");
    if (!description) return;
    
    const list = document.getElementById('knowledge-list');
    const newItem = document.createElement('div');
    newItem.className = 'major knowledge-item';
    newItem.innerHTML = `
        <h4 class="editable" data-field="knowledge-title">${title}</h4>
        <span class="editable" data-field="knowledge-period">${period}</span>
        <p class="editable" data-field="knowledge-description">
            ${description}
        </p>
        <button class="edit-btn" onclick="editField(this)">✏️</button>
        <button class="delete-btn" onclick="this.parentElement.remove()">🗑️</button>
    `;
    list.appendChild(newItem);
}

// Reference form functions
function showReferenceForm() {
    document.getElementById('reference-form').classList.remove('hidden');
}

function cancelNewReference() {
    document.getElementById('reference-form').classList.add('hidden');
    // Clear form
    document.getElementById('new-reference-name').value = '';
    document.getElementById('new-reference-position').value = '';
    document.getElementById('new-reference-phone').value = '';
    document.getElementById('new-reference-email').value = '';
}

function submitNewReference() {
    const name = document.getElementById('new-reference-name').value;
    const position = document.getElementById('new-reference-position').value;
    const phone = document.getElementById('new-reference-phone').value;
    const email = document.getElementById('new-reference-email').value;
    
    // Validation
    if (!name || !position || !phone) {
        alert('Zəhmət olmasa bütün məlumatları doldurun!');
        return;
    }
    
    if (email && !email.includes('@')) {
        alert('Email düzgün formatda deyil!');
        return;
    }
    
    const list = document.getElementById('references-list');
    const newItem = document.createElement('div');
    newItem.className = 'reference-item';
    newItem.innerHTML = `
        <p><strong class="editable" data-field="reference-name">${name}</strong><br>
        <span class="editable" data-field="reference-position">${position}</span><br>
        📞 <span class="editable" data-field="reference-phone">${phone}</span><br>
        ${email ? `📧 <span class="editable" data-field="reference-email">${email}</span>` : ''}
        <button class="edit-btn" onclick="editField(this)">✏️</button>
        <button class="delete-btn" onclick="this.parentElement.parentElement.remove()">🗑️</button></p>
    `;
    list.appendChild(newItem);
    
    // Hide and clear form
    cancelNewReference();
}

// Delete functions
function deleteEducation(button) {
    if (confirm('Bu təhsil məlumatını silmək istədiyinizə əminsiniz?')) {
        button.parentElement.parentElement.remove();
    }
}

function deleteSkill(button) {
    if (confirm('Bu bacarığı silmək istədiyinizə əminsiniz?')) {
        button.parentElement.remove();
    }
}

function deleteLanguage(button) {
    if (confirm('Bu dili silmək istədiyinizə əminsiniz?')) {
        button.parentElement.remove();
    }
}

function deleteKnowledge(button) {
    if (confirm('Bu bilik məlumatını silmək istədiyinizə əminsiniz?')) {
        button.parentElement.remove();
    }
}

function deleteReference(button) {
    if (confirm('Bu referansı silmək istədiyinizə əminsiniz?')) {
        button.parentElement.parentElement.remove();
    }
}

// Save and load data
function saveAllData() {
    const data = {
        profile: {
            firstName: document.querySelector('[data-field="first-name"]').textContent,
            lastName: document.querySelector('[data-field="last-name"]').textContent,
            position: document.querySelector('[data-field="position"]').textContent,
            profileText: document.querySelector('[data-field="profile"]').textContent
        },
        contacts: Array.from(document.querySelectorAll('#contact-list li')).map(li => ({
            text: li.textContent.replace('✏️', '').replace('🗑️', '').trim(),
            html: li.innerHTML
        })),
        education: Array.from(document.querySelectorAll('.education-item')).map(item => ({
            year: item.querySelector('[data-field="education-year"]').textContent,
            institution: item.querySelector('[data-field="education-institution"]').textContent,
            major: item.querySelector('[data-field="education-major"]').textContent,
            html: item.innerHTML
        })),
        skills: Array.from(document.querySelectorAll('#skills-list li')).map(li => ({
            text: li.querySelector('[data-field="skill"]').textContent,
            html: li.innerHTML
        })),
        languages: Array.from(document.querySelectorAll('#languages-list li')).map(li => ({
            text: li.querySelector('[data-field="language"]').textContent,
            html: li.innerHTML
        })),
        knowledge: Array.from(document.querySelectorAll('.knowledge-item')).map(item => ({
            title: item.querySelector('[data-field="knowledge-title"]').textContent,
            period: item.querySelector('[data-field="knowledge-period"]').textContent,
            description: item.querySelector('[data-field="knowledge-description"]').textContent,
            html: item.innerHTML
        })),
        references: Array.from(document.querySelectorAll('.reference-item')).map(item => ({
            name: item.querySelector('[data-field="reference-name"]').textContent,
            position: item.querySelector('[data-field="reference-position"]').textContent,
            phone: item.querySelector('[data-field="reference-phone"]').textContent,
            email: item.querySelector('[data-field="reference-email"]')?.textContent || '',
            html: item.innerHTML
        }))
    };
    
    localStorage.setItem('resumeData', JSON.stringify(data));
    alert('Məlumatlar yadda saxlanıldı!');
}

function loadAllData() {
    const savedData = localStorage.getItem('resumeData');
    if (!savedData) return;
    
    const data = JSON.parse(savedData);
    
    // Load profile
    document.querySelector('[data-field="first-name"]').textContent = data.profile.firstName;
    document.querySelector('[data-field="last-name"]').textContent = data.profile.lastName;
    document.querySelector('[data-field="position"]').textContent = data.profile.position;
    document.querySelector('[data-field="profile"]').textContent = data.profile.profileText;
    
    // Load contacts
    const contactList = document.getElementById('contact-list');
    contactList.innerHTML = '';
    data.contacts.forEach(contact => {
        const li = document.createElement('li');
        li.innerHTML = contact.html;
        contactList.appendChild(li);
    });
    
    // Load education
    const educationList = document.getElementById('education-list');
    educationList.innerHTML = '';
    data.education.forEach(edu => {
        const div = document.createElement('div');
        div.className = 'education-item';
        div.innerHTML = edu.html;
        educationList.appendChild(div);
    });
    
    // Load skills
    const skillsList = document.getElementById('skills-list');
    skillsList.innerHTML = '';
    data.skills.forEach(skill => {
        const li = document.createElement('li');
        li.innerHTML = skill.html;
        skillsList.appendChild(li);
    });
    
    // Load languages
    const languagesList = document.getElementById('languages-list');
    languagesList.innerHTML = '';
    data.languages.forEach(lang => {
        const li = document.createElement('li');
        li.innerHTML = lang.html;
        languagesList.appendChild(li);
    });
    
    // Load knowledge
    const knowledgeList = document.getElementById('knowledge-list');
    knowledgeList.innerHTML = '';
    data.knowledge.forEach(know => {
        const div = document.createElement('div');
        div.className = 'major knowledge-item';
        div.innerHTML = know.html;
        knowledgeList.appendChild(div);
    });
    
    // Load references
    const referencesList = document.getElementById('references-list');
    referencesList.innerHTML = '';
    data.references.forEach(ref => {
        const div = document.createElement('div');
        div.className = 'reference-item';
        div.innerHTML = ref.html;
        referencesList.appendChild(div);
    });
}

function resetAllData() {
    if (confirm('Bütün məlumatları sıfırlamaq istədiyinizə əminsiniz? Bu əməliyyat geri alına bilməz.')) {
        localStorage.removeItem('resumeData');
        location.reload();
    }
}

// JSON functions
async function loadFromJSON() {
    try {
        // In a real scenario, you would fetch from an actual JSON file or API
        // For demo purposes, we'll use a simulated JSON response
        const response = await fetch('data.json');
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        
        // Update profile
        document.querySelector('[data-field="first-name"]').textContent = data.firstName;
        document.querySelector('[data-field="last-name"]').textContent = data.lastName;
        document.querySelector('[data-field="position"]').textContent = data.position;
        document.querySelector('[data-field="profile"]').textContent = data.profile;
        
        // Update education
        const educationList = document.getElementById('education-list');
        educationList.innerHTML = '';
        data.education.forEach(edu => {
            const div = document.createElement('div');
            div.className = 'education-item';
            div.innerHTML = `
                <p><span class="editable" data-field="education-year">${edu.year}</span><br>
                <strong class="editable" data-field="education-institution">${edu.institution}</strong><br>
                <span class="editable" data-field="education-major">${edu.major}</span>
                <button class="edit-btn" onclick="editField(this)">✏️</button>
                <button class="delete-btn" onclick="this.parentElement.parentElement.remove()">🗑️</button></p>
            `;
            educationList.appendChild(div);
        });
        
        alert('Məlumatlar JSON faylından uğurla yükləndi!');
    } catch (error) {
        console.error('Error loading JSON:', error);
        alert('JSON faylı yüklənərkən xəta baş verdi: ' + error.message);
        
        // Fallback to sample data if fetch fails
        const sampleData = {
            firstName: "ORXAN",
            lastName: "QULİYEV",
            position: "Kibertəhlükəsizlik Kafedrası",
            profile: "Mən, Azərbaycan Texniki Universitetində (AzTU) İnformasiya Təhlükəsizliyi ixtisası üzrə təhsil alıram. Kibertəhlükəsizlik sahəsinə dərin marağım var və bu istiqamətdə daimi şəkildə biliklərimi artırmağa çalışıram. Praktiki olaraq əsasən Kali Linux və Windows mühitlərində işləyirəm, müxtəlif testlər və analizlər aparıram. Proqramlaşdırma sahəsində C++ və Python dilləri üzrə əsas biliklərə malikəm. TryHackMe platformasında tapşırıqlar üzərində çalışıram və kibertəhlükəsizlik alətləri ilə təcrübəm var.",
            education: [
                {
                    year: "2024",
                    institution: "Azərbaycan Texniki Universiteti",
                    major: "İnformasiya təhlükəsizliyi"
                }
            ]
        };
        
        document.querySelector('[data-field="first-name"]').textContent = sampleData.firstName;
        document.querySelector('[data-field="last-name"]').textContent = sampleData.lastName;
        document.querySelector('[data-field="position"]').textContent = sampleData.position;
        document.querySelector('[data-field="profile"]').textContent = sampleData.profile;
        
        const educationList = document.getElementById('education-list');
        educationList.innerHTML = '';
        sampleData.education.forEach(edu => {
            const div = document.createElement('div');
            div.className = 'education-item';
            div.innerHTML = `
                <p><span class="editable" data-field="education-year">${edu.year}</span><br>
                <strong class="editable" data-field="education-institution">${edu.institution}</strong><br>
                <span class="editable" data-field="education-major">${edu.major}</span>
                <button class="edit-btn" onclick="editField(this)">✏️</button>
                <button class="delete-btn" onclick="this.parentElement.parentElement.remove()">🗑️</button></p>
            `;
            educationList.appendChild(div);
        });
    }
}

// Toggle edit mode
function toggleEditMode() {
    const editButtons = document.querySelectorAll('.edit-btn, .delete-btn, [contenteditable="true"]');
    const actionButtons = document.querySelectorAll('.action-buttons button, #reference-form button, button:not(.edit-btn):not(.delete-btn)');
    
    editButtons.forEach(btn => {
        if (btn.style.display === 'none') {
            btn.style.display = '';
        } else {
            btn.style.display = 'none';
        }
    });
    
    actionButtons.forEach(btn => {
        if (btn.style.display === 'none') {
            btn.style.display = '';
        } else {
            btn.style.display = 'none';
        }
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadAllData();
    
    // Close all sections by default
    document.querySelectorAll('.section-toggle h2').forEach(header => {
        const sectionId = header.textContent.replace(' ▼', '').replace(' ▶', '').toLowerCase();
        const section = document.getElementById(`${sectionId}-section`);
        section.classList.add('hidden');
        header.innerHTML = header.innerHTML.replace('▼', '▶');
    });
});