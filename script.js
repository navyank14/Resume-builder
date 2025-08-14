// Main Application Script
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Check if we're on the index page
    if (document.getElementById('welcomeSection')) {
        setupIndexPage();
    }
    
    // Check if we're on the form page
    if (document.getElementById('resumeForm')) {
        setupFormPage();
    }
    
    // Check if we're on the preview page
    if (document.getElementById('resumePreview')) {
        setupPreviewPage();
    }
}

function setupIndexPage() {
    // Add smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            // Check if we're on the index page and the target section exists
            if (targetId === 'home') {
                // If clicking Home, scroll to top of current page
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else if (targetId === 'templates') {
                // If clicking Templates, show template selection
                showTemplates();
            } else {
                // For other sections, scroll to them if they exist
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Special handling for Home link - always go to home page
    const homeLink = document.querySelector('.home-link');
    if (homeLink) {
        homeLink.addEventListener('click', function(e) {
            e.preventDefault();
            // Always navigate to home page
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // Check for hash navigation on page load
    checkHashNavigation();

    // Add animations to elements when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe all feature cards and template cards
    document.querySelectorAll('.feature-card, .template-card').forEach(card => {
        observer.observe(card);
    });

    // Add floating animation to CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.classList.add('float');
    }
    
    // Setup scroll-triggered home button for index page
    setupScrollHomeButton();
}

function checkHashNavigation() {
    // Check if there's a hash in the URL
    const hash = window.location.hash.substring(1);
    
    if (hash === 'templates') {
        // Show template selection
        showTemplates();
    } else if (hash === 'features') {
        // Scroll to features section
        const featuresSection = document.getElementById('features');
        if (featuresSection) {
            setTimeout(() => {
                featuresSection.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    } else if (hash === 'contact') {
        // Scroll to contact section
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            setTimeout(() => {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }
}

function setupFormPage() {
    // Get template from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const selectedTemplate = urlParams.get('template');
    
    if (selectedTemplate) {
        // Update the page title and header to show selected template
        updateFormHeader(selectedTemplate);
        
        // Store the selected template for later use
        localStorage.setItem('selectedTemplate', selectedTemplate);
    }
    
    // Setup form functionality
    setupEventListeners();
    setupFileUploads();
    setupFormValidation();
    loadSavedData();
    
    // Setup navigation for form page
    setupFormPageNavigation();
}

function setupFormPageNavigation() {
    // Handle Home link navigation on form page
    const homeLink = document.querySelector('.home-link');
    if (homeLink) {
        homeLink.addEventListener('click', function(e) {
            e.preventDefault();
            // Navigate to home page
            window.location.href = 'index.html';
        });
    }
    
    // Handle other navigation links
    const navLinks = document.querySelectorAll('.nav-links a:not(.home-link)');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            if (targetId === 'templates') {
                // Go back to home page and show templates
                window.location.href = 'index.html#templates';
            } else if (targetId === 'features') {
                // Go to home page and scroll to features
                window.location.href = 'index.html#features';
            } else if (targetId === 'contact') {
                // Go to home page and scroll to contact
                window.location.href = 'index.html#contact';
            }
        });
    });
    
    // Add scroll-triggered home button visibility
    setupScrollHomeButton();
}

function setupPreviewPage() {
    // Setup preview page functionality
    setupPreviewActions();
}

function updateFormHeader(template) {
    const header = document.querySelector('.form-header h1');
    if (header) {
        const templateNames = {
            'professional': 'Professional Template',
            'modern': 'Modern Template',
            'custom': 'Custom Template'
        };
        header.textContent = `Resume Builder - ${templateNames[template] || 'Template'}`;
    }
}

function showTemplates() {
    // Hide welcome section and show template selection
    const welcomeSection = document.getElementById('welcomeSection');
    const templateSection = document.getElementById('templateSection');
    
    if (welcomeSection && templateSection) {
        welcomeSection.style.display = 'none';
        templateSection.style.display = 'block';
        
        // Add fade-in animation
        templateSection.classList.add('fade-in');
        
        // Smooth scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function showWelcome() {
    // Show welcome section and hide template selection
    const welcomeSection = document.getElementById('welcomeSection');
    const templateSection = document.getElementById('templateSection');
    
    if (welcomeSection && templateSection) {
        templateSection.style.display = 'none';
        welcomeSection.style.display = 'block';
        
        // Add fade-in animation
        welcomeSection.classList.add('fade-in');
        
        // Smooth scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function selectTemplate(templateType) {
    // Store the selected template
    localStorage.setItem('selectedTemplate', templateType);
    
    // Redirect to the form page with template parameter
    window.location.href = `form.html?template=${templateType}`;
}

function setupEventListeners() {
    // Add section buttons
    const addEducationBtn = document.getElementById('addEducation');
    const addExperienceBtn = document.getElementById('addExperience');
    const addProjectBtn = document.getElementById('addProject');
    const addCertificationBtn = document.getElementById('addCertification');
    
    if (addEducationBtn) addEducationBtn.addEventListener('click', addEducation);
    if (addExperienceBtn) addExperienceBtn.addEventListener('click', addExperience);
    if (addProjectBtn) addProjectBtn.addEventListener('click', addProject);
    if (addCertificationBtn) addCertificationBtn.addEventListener('click', addCertification);
    
    // Current job checkbox
    const currentJobCheckbox = document.getElementById('currentJob');
    if (currentJobCheckbox) {
        currentJobCheckbox.addEventListener('change', toggleEndDate);
    }
    
    // Back to templates button
    const backToTemplatesBtn = document.querySelector('.back-to-templates');
    if (backToTemplatesBtn) {
        backToTemplatesBtn.addEventListener('click', goBackToTemplates);
    }
}

function setupFileUploads() {
    // Profile photo upload
    const profilePhotoInput = document.getElementById('profilePhoto');
    if (profilePhotoInput) {
        profilePhotoInput.addEventListener('change', handleProfilePhotoUpload);
    }
    
    // Portfolio files upload
    const portfolioInput = document.getElementById('portfolioFiles');
    if (portfolioInput) {
        portfolioInput.addEventListener('change', handlePortfolioFilesUpload);
    }
    
    // Certificate files upload
    const certificateInputs = document.querySelectorAll('.certificate-file');
    certificateInputs.forEach(input => {
        input.addEventListener('change', handleCertificateUpload);
    });
}

function setupFormValidation() {
    const form = document.getElementById('resumeForm');
    if (form) {
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => clearValidation(input));
        });
    }
}

function handleProfilePhotoUpload(event) {
    const file = event.target.files[0];
    if (file) {
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            alert('Profile photo must be less than 5MB');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('photoPreview');
            if (preview) {
                preview.src = e.target.result;
                preview.style.display = 'block';
            }
        };
        reader.readAsDataURL(file);
    }
}

function handlePortfolioFilesUpload(event) {
    const files = Array.from(event.target.files);
    const fileList = document.getElementById('portfolioFileList');
    
    if (fileList) {
        fileList.innerHTML = '';
        files.forEach(file => {
            const fileItem = createFileItem(file);
            fileList.appendChild(fileItem);
        });
    }
}

function createFileItem(file) {
    const fileItem = document.createElement('div');
    fileItem.className = 'file-item';
    fileItem.innerHTML = `
        <div class="file-info">
            <i class="${getFileIcon(file.type)}"></i>
            <span>${file.name}</span>
            <small>${formatFileSize(file.size)}</small>
        </div>
        <button type="button" class="remove-file" onclick="removeFile(this)">
            <i class="fas fa-times"></i>
        </button>
    `;
    return fileItem;
}

function getFileIcon(fileType) {
    if (fileType.includes('pdf')) return 'fas fa-file-pdf';
    if (fileType.includes('image')) return 'fas fa-file-image';
    if (fileType.includes('word')) return 'fas fa-file-word';
    if (fileType.includes('excel')) return 'fas fa-file-excel';
    return 'fas fa-file';
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function removeFile(button) {
    button.closest('.file-item').remove();
}

function handleCertificateUpload(event) {
    const file = event.target.files[0];
    if (file) {
        if (file.size > 10 * 1024 * 1024) { // 10MB limit
            alert('Certificate file must be less than 10MB');
            return;
        }
        
        // Update the file name display
        const fileNameDisplay = event.target.parentElement.querySelector('.file-name');
        if (fileNameDisplay) {
            fileNameDisplay.textContent = file.name;
        }
    }
}

function validateField(field) {
    const value = field.value.trim();
    const isValid = value.length > 0;
    
    if (!isValid) {
        field.classList.add('error');
        const errorMsg = field.parentElement.querySelector('.error-message') || 
                        createErrorMessage(field);
        errorMsg.textContent = 'This field is required';
    } else {
        clearValidation(field);
    }
    
    return isValid;
}

function createErrorMessage(field) {
    const errorMsg = document.createElement('div');
    errorMsg.className = 'error-message';
    errorMsg.style.color = '#ff6b6b';
    errorMsg.style.fontSize = '14px';
    errorMsg.style.marginTop = '5px';
    field.parentElement.appendChild(errorMsg);
    return errorMsg;
}

function clearValidation(field) {
    field.classList.remove('error');
    const errorMsg = field.parentElement.querySelector('.error-message');
    if (errorMsg) {
        errorMsg.remove();
    }
}

function toggleEndDate() {
    const currentJobCheckbox = document.getElementById('currentJob');
    const endDateField = document.getElementById('endDate');
    
    if (currentJobCheckbox && endDateField) {
        if (currentJobCheckbox.checked) {
            endDateField.style.display = 'none';
            endDateField.value = '';
        } else {
            endDateField.style.display = 'block';
        }
    }
}

function addEducation() {
    const educationContainer = document.getElementById('educationContainer');
    const educationCount = educationContainer.children.length;
    
    const newEducation = document.createElement('div');
    newEducation.className = 'education-item';
    newEducation.innerHTML = `
        <h4>Education ${educationCount + 1}</h4>
        <div class="form-grid">
            <div class="form-group">
                <label for="degree${educationCount + 1}">Degree/Certificate *</label>
                <input type="text" id="degree${educationCount + 1}" name="degree${educationCount + 1}" required>
            </div>
            <div class="form-group">
                <label for="school${educationCount + 1}">School/Institution *</label>
                <input type="text" id="school${educationCount + 1}" name="school${educationCount + 1}" required>
            </div>
            <div class="form-group">
                <label for="graduationYear${educationCount + 1}">Graduation Year *</label>
                <input type="number" id="graduationYear${educationCount + 1}" name="graduationYear${educationCount + 1}" min="1950" max="2030" required>
            </div>
        </div>
        <button type="button" class="remove-section" onclick="removeSection(this)">
            <i class="fas fa-trash"></i> Remove Education
        </button>
    `;
    
    educationContainer.appendChild(newEducation);
    setupValidationForNewFields(newEducation);
}

function addExperience() {
    const experienceContainer = document.getElementById('experienceContainer');
    const experienceCount = experienceContainer.children.length;
    
    const newExperience = document.createElement('div');
    newExperience.className = 'experience-item';
    newExperience.innerHTML = `
        <h4>Work Experience ${experienceCount + 1}</h4>
        <div class="form-grid">
            <div class="form-group">
                <label for="jobTitle${experienceCount + 1}">Job Title *</label>
                <input type="text" id="jobTitle${experienceCount + 1}" name="jobTitle${experienceCount + 1}" required>
            </div>
            <div class="form-group">
                <label for="company${experienceCount + 1}">Company *</label>
                <input type="text" id="company${experienceCount + 1}" name="company${experienceCount + 1}" required>
            </div>
            <div class="form-group">
                <label for="startDate${experienceCount + 1}">Start Date *</label>
                <input type="month" id="startDate${experienceCount + 1}" name="startDate${experienceCount + 1}" required>
            </div>
            <div class="form-group">
                <label for="endDate${experienceCount + 1}">End Date</label>
                <input type="month" id="endDate${experienceCount + 1}" name="endDate${experienceCount + 1}">
            </div>
            <div class="form-group full-width">
                <label for="jobDescription${experienceCount + 1}">Job Description *</label>
                <textarea id="jobDescription${experienceCount + 1}" name="jobDescription${experienceCount + 1}" rows="4" required></textarea>
            </div>
        </div>
        <div class="checkbox-group">
            <input type="checkbox" id="currentJob${experienceCount + 1}" name="currentJob${experienceCount + 1}">
            <label for="currentJob${experienceCount + 1}">I currently work here</label>
        </div>
        <button type="button" class="remove-section" onclick="removeSection(this)">
            <i class="fas fa-trash"></i> Remove Experience
        </button>
    `;
    
    experienceContainer.appendChild(newExperience);
    setupValidationForNewFields(newExperience);
    
    // Add event listener for current job checkbox
    const currentJobCheckbox = newExperience.querySelector(`#currentJob${experienceCount + 1}`);
    const endDateField = newExperience.querySelector(`#endDate${experienceCount + 1}`);
    if (currentJobCheckbox && endDateField) {
        currentJobCheckbox.addEventListener('change', function() {
            if (this.checked) {
                endDateField.style.display = 'none';
                endDateField.value = '';
            } else {
                endDateField.style.display = 'block';
            }
        });
    }
}

function addProject() {
    const projectContainer = document.getElementById('projectContainer');
    const projectCount = projectContainer.children.length;
    
    const newProject = document.createElement('div');
    newProject.className = 'project-item';
    newProject.innerHTML = `
        <h4>Project ${projectCount + 1}</h4>
        <div class="form-grid">
            <div class="form-group">
                <label for="projectName${projectCount + 1}">Project Name *</label>
                <input type="text" id="projectName${projectCount + 1}" name="projectName${projectCount + 1}" required>
            </div>
            <div class="form-group">
                <label for="projectLink${projectCount + 1}">Project Link</label>
                <input type="url" id="projectLink${projectCount + 1}" name="projectLink${projectCount + 1}" placeholder="https://...">
            </div>
            <div class="form-group">
                <label for="githubLink${projectCount + 1}">GitHub Link</label>
                <input type="url" id="githubLink${projectCount + 1}" name="githubLink${projectCount + 1}" placeholder="https://github.com/...">
            </div>
            <div class="form-group full-width">
                <label for="projectDescription${projectCount + 1}">Project Description *</label>
                <textarea id="projectDescription${projectCount + 1}" name="projectDescription${projectCount + 1}" rows="3" required></textarea>
            </div>
        </div>
        <button type="button" class="remove-section" onclick="removeSection(this)">
            <i class="fas fa-trash"></i> Remove Project
        </button>
    `;
    
    projectContainer.appendChild(newProject);
    setupValidationForNewFields(newProject);
}

function addCertification() {
    const certificationContainer = document.getElementById('certificationContainer');
    const certificationCount = certificationContainer.children.length;
    
    const newCertification = document.createElement('div');
    newCertification.className = 'certification-item';
    newCertification.innerHTML = `
        <h4>Certification ${certificationCount + 1}</h4>
        <div class="form-grid">
            <div class="form-group">
                <label for="certificationName${certificationCount + 1}">Certification Name *</label>
                <input type="text" id="certificationName${certificationCount + 1}" name="certificationName${certificationCount + 1}" required>
            </div>
            <div class="form-group">
                <label for="issuingOrganization${certificationCount + 1}">Issuing Organization *</label>
                <input type="text" id="issuingOrganization${certificationCount + 1}" name="issuingOrganization${certificationCount + 1}" required>
            </div>
            <div class="form-group">
                <label for="issueDate${certificationCount + 1}">Issue Date *</label>
                <input type="month" id="issueDate${certificationCount + 1}" name="issueDate${certificationCount + 1}" required>
            </div>
            <div class="form-group">
                <label for="verificationLink${certificationCount + 1}">Verification Link</label>
                <input type="url" id="verificationLink${certificationCount + 1}" name="verificationLink${certificationCount + 1}" placeholder="https://...">
            </div>
            <div class="form-group full-width">
                <label for="certificateFile${certificationCount + 1}">Upload Certificate</label>
                <div class="file-upload-wrapper">
                    <input type="file" id="certificateFile${certificationCount + 1}" name="certificateFile${certificationCount + 1}" class="certificate-file" accept=".pdf,.jpg,.jpeg,.png">
                    <label for="certificateFile${certificationCount + 1}" class="file-upload-label">
                        <i class="fas fa-cloud-upload-alt"></i>
                        <span>Click to upload certificate</span>
                        <small>PDF, JPG, PNG (max 10MB)</small>
                    </label>
                    <div class="file-name"></div>
                </div>
            </div>
        </div>
        <button type="button" class="remove-section" onclick="removeSection(this)">
            <i class="fas fa-trash"></i> Remove Certification
        </button>
    `;
    
    certificationContainer.appendChild(newCertification);
    setupValidationForNewFields(newCertification);
    
    // Add event listener for certificate file upload
    const certificateInput = newCertification.querySelector(`#certificateFile${certificationCount + 1}`);
    if (certificateInput) {
        certificateInput.addEventListener('change', handleCertificateUpload);
    }
}

function removeSection(button) {
    button.closest('.education-item, .experience-item, .project-item, .certification-item').remove();
}

function setupValidationForNewFields(container) {
    const requiredFields = container.querySelectorAll('input[required], textarea[required], select[required]');
    requiredFields.forEach(field => {
        field.addEventListener('blur', () => validateField(field));
        field.addEventListener('input', () => clearValidation(field));
    });
}

function goBackToTemplates() {
    // Go back to the index page
    window.location.href = 'index.html';
}

function goToHomePage() {
    // Navigate to the home page
    window.location.href = 'index.html';
}

function scrollToTop() {
    // Smooth scroll to top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function setupScrollHomeButton() {
    // Show/hide floating home button based on scroll position
    const floatingHomeBtn = document.querySelector('.floating-home-btn');
    if (floatingHomeBtn) {
        // Check if we're on the index page or form page
        const isIndexPage = document.getElementById('welcomeSection');
        
        if (isIndexPage) {
            // On index page, show button when scrolling down
            window.addEventListener('scroll', function() {
                if (window.scrollY > 300) {
                    floatingHomeBtn.style.opacity = '1';
                    floatingHomeBtn.style.visibility = 'visible';
                } else {
                    floatingHomeBtn.style.opacity = '0';
                    floatingHomeBtn.style.visibility = 'hidden';
                }
            });
            
            // Initially hide the button
            floatingHomeBtn.style.opacity = '0';
            floatingHomeBtn.style.visibility = 'hidden';
        } else {
            // On form page, always show the button
            floatingHomeBtn.style.opacity = '1';
            floatingHomeBtn.style.visibility = 'visible';
        }
    }
}

function generateResume() {
    if (validateForm()) {
        const formData = collectFormData();
        const selectedTemplate = localStorage.getItem('selectedTemplate') || 'professional';
        
        // Generate resume content based on selected template
        generateResumeContent(formData, selectedTemplate);
        
        // Show preview
        showResumePreview();
    }
}

function validateForm() {
    const requiredFields = document.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function collectFormData() {
    return {
        personalInfo: {
            fullName: document.getElementById('fullName')?.value || '',
            email: document.getElementById('email')?.value || '',
            phone: document.getElementById('phone')?.value || '',
            address: document.getElementById('address')?.value || '',
            linkedin: document.getElementById('linkedin')?.value || '',
            github: document.getElementById('github')?.value || '',
            website: document.getElementById('website')?.value || ''
        },
        profilePhoto: document.getElementById('profilePhoto')?.files[0] || null,
        professionalSummary: document.getElementById('professionalSummary')?.value || '',
        education: collectEducationData(),
        experience: collectExperienceData(),
        skills: {
            technical: document.getElementById('technicalSkills')?.value || '',
            soft: document.getElementById('softSkills')?.value || '',
            languages: document.getElementById('languages')?.value || ''
        },
        projects: collectProjectData(),
        certifications: collectCertificationData(),
        portfolioFiles: Array.from(document.getElementById('portfolioFiles')?.files || [])
    };
}

function collectEducationData() {
    const educationItems = document.querySelectorAll('.education-item');
    return Array.from(educationItems).map(item => ({
        degree: item.querySelector('input[id^="degree"]')?.value || '',
        school: item.querySelector('input[id^="school"]')?.value || '',
        graduationYear: item.querySelector('input[id^="graduationYear"]')?.value || ''
    }));
}

function collectExperienceData() {
    const experienceItems = document.querySelectorAll('.experience-item');
    return Array.from(experienceItems).map(item => ({
        jobTitle: item.querySelector('input[id^="jobTitle"]')?.value || '',
        company: item.querySelector('input[id^="company"]')?.value || '',
        startDate: item.querySelector('input[id^="startDate"]')?.value || '',
        endDate: item.querySelector('input[id^="endDate"]')?.value || '',
        currentJob: item.querySelector('input[id^="currentJob"]')?.checked || false,
        jobDescription: item.querySelector('textarea[id^="jobDescription"]')?.value || ''
    }));
}

function collectProjectData() {
    const projectItems = document.querySelectorAll('.project-item');
    return Array.from(projectItems).map(item => ({
        projectName: item.querySelector('input[id^="projectName"]')?.value || '',
        projectLink: item.querySelector('input[id^="projectLink"]')?.value || '',
        githubLink: item.querySelector('input[id^="githubLink"]')?.value || '',
        projectDescription: item.querySelector('textarea[id^="projectDescription"]')?.value || ''
    }));
}

function collectCertificationData() {
    const certificationItems = document.querySelectorAll('.certification-item');
    return Array.from(certificationItems).map(item => ({
        certificationName: item.querySelector('input[id^="certificationName"]')?.value || '',
        issuingOrganization: item.querySelector('input[id^="issuingOrganization"]')?.value || '',
        issueDate: item.querySelector('input[id^="issueDate"]')?.value || '',
        verificationLink: item.querySelector('input[id^="verificationLink"]')?.value || '',
        certificateFile: item.querySelector('input[id^="certificateFile"]')?.files[0] || null
    }));
}

function generateResumeContent(formData, template) {
    // This function will be implemented in templates.js
    if (typeof generateTemplateContent === 'function') {
        const resumeContent = generateTemplateContent(formData, template);
        document.getElementById('resumeContent').innerHTML = resumeContent;
    }
}

function showResumePreview() {
    document.getElementById('resumeForm').style.display = 'none';
    document.getElementById('resumePreview').style.display = 'block';
    
    // Smooth scroll to preview
    document.getElementById('resumePreview').scrollIntoView({ behavior: 'smooth' });
}

function showForm() {
    document.getElementById('resumePreview').style.display = 'none';
    document.getElementById('resumeForm').style.display = 'block';
    
    // Smooth scroll to form
    document.getElementById('resumeForm').scrollIntoView({ behavior: 'smooth' });
}

function saveResume() {
    const formData = collectFormData();
    localStorage.setItem('resumeData', JSON.stringify(formData));
    alert('Resume data saved successfully!');
}

function loadSavedData() {
    const savedData = localStorage.getItem('resumeData');
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            populateFormWithData(data);
        } catch (error) {
            console.error('Error loading saved data:', error);
        }
    }
}

function populateFormWithData(data) {
    // Populate personal info
    if (data.personalInfo) {
        Object.keys(data.personalInfo).forEach(key => {
            const field = document.getElementById(key);
            if (field && data.personalInfo[key]) {
                field.value = data.personalInfo[key];
            }
        });
    }
    
    // Populate other fields
    if (data.professionalSummary) {
        const summaryField = document.getElementById('professionalSummary');
        if (summaryField) summaryField.value = data.professionalSummary;
    }
    
    if (data.skills) {
        if (data.skills.technical) {
            const techSkillsField = document.getElementById('technicalSkills');
            if (techSkillsField) techSkillsField.value = data.skills.technical;
        }
        if (data.skills.soft) {
            const softSkillsField = document.getElementById('softSkills');
            if (softSkillsField) softSkillsField.value = data.skills.soft;
        }
        if (data.skills.languages) {
            const languagesField = document.getElementById('languages');
            if (languagesField) languagesField.value = data.skills.languages;
        }
    }
}

function setupPreviewActions() {
    // Setup download and print functionality
    const downloadBtn = document.getElementById('downloadBtn');
    const printBtn = document.getElementById('printBtn');
    const editBtn = document.getElementById('editBtn');
    
    if (downloadBtn) downloadBtn.addEventListener('click', downloadResume);
    if (printBtn) printBtn.addEventListener('click', printResume);
    if (editBtn) editBtn.addEventListener('click', showForm);
}

function downloadResume() {
    // Implementation for downloading resume as PDF
    alert('Download functionality will be implemented with a PDF library');
}

function printResume() {
    window.print();
}

// Utility function to preview profile photo
function previewPhoto(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('photoPreview');
            if (preview) {
                preview.src = e.target.result;
                preview.style.display = 'block';
            }
        };
        reader.readAsDataURL(input.files[0]);
    }
}
