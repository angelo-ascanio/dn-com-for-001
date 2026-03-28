/* ------------------------------------------------------
   PHASE 1 — UX UNIFICATION SCRIPT
------------------------------------------------------ */

function unifyNavHighlight(targetId) {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('current');
    });

    const target = document.getElementById('nav-' + targetId);
    if (target) target.classList.add('current');
}

function showValid(el) {
    el.classList.remove('invalid');
    el.classList.add('valid');
}

function showInvalid(el) {
    el.classList.remove('valid');
    el.classList.add('invalid');
}

/* Override your navigateFlow to include unified UX */
const _oldNavigateFlow = typeof navigateFlow !== "undefined" ? navigateFlow : null;
navigateFlow = function (targetId) {
    if (_oldNavigateFlow) _oldNavigateFlow(targetId);

    const sec = document.getElementById(targetId);
    if (sec) sec.classList.add('fade-in');
};

/* Improved validation visuals */
function updateInitialStepVisuals(isValid) {
    const nextBtn = document.getElementById('btn-next-initial');

    if (isValid) {
        nextBtn.disabled = false;
        showValid(nextBtn);
    } else {
        nextBtn.disabled = true;
        showInvalid(nextBtn);
    }
}

/* Hook into your existing validateStep */
const _oldValidateStep = validateStep;
validateStep = function (stepId) {
    const result = _oldValidateStep(stepId);

    if (stepId === "sec-initial") {
        updateInitialStepVisuals(result);
    }

    refreshMainNav();
    renderExportStatus();

    return result;
};