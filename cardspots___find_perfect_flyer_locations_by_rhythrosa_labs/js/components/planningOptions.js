export function initPlanningOptions() {
    const container = document.getElementById('planningOptionsContainer');
    container.innerHTML = `
        <div class="row">
            <div class="col-md-10 offset-md-1">
                <div class="planning-options">
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="planDayCheckbox">
                        <label class="form-check-label" for="planDayCheckbox">Plan a Day</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="planWeekCheckbox">
                        <label class="form-check-label" for="planWeekCheckbox">Plan a Week</label>
                    </div>
                </div>
            </div>
        </div>
    `;
}