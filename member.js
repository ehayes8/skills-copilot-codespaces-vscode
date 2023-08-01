function skillsMember() {
    var member = document.getElementById('member').value;
    var skills = document.getElementById('skills').value;
    var skill = document.getElementById('skill').value;
    if (skill == '') {
        alert('Please fill in the skill');
        return;
    }
    if (skills.indexOf(skill) > -1) {
        alert('Skill already exists');
        return;
    }
    if (skills == '') {
        skills = skill;
    } else {
        skills += ',' + skill;
    }
    var url = '/skills/' + member;
    var data = {skills: skills};
    $.ajax({
        url: url,
        type: 'PUT',
        data: data,
        success: function (data) {
            window.location.reload();
        }
    });
}