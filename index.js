const EXPERIENCES_ENDPOINT = 'https://zany-skitter-caper.glitch.me/experiences';
const SKILLS_ENDPOINT = 'https://zany-skitter-caper.glitch.me/skills';

const skillsSection = document.querySelector('#skills')
const experiencesSection = document.querySelector('#experience')

async function getData() {
  const skillsRequest = fetch(SKILLS_ENDPOINT);
  const experiencesRequest = fetch(EXPERIENCES_ENDPOINT);

  const [ skillsRes, experiencesRes ] = await Promise.all([skillsRequest, experiencesRequest]);
  const skills = await skillsRes.json();
  const experiences = await experiencesRes.json();

  experiences.forEach((exp) => generateExperience(exp))
  skills.forEach((sk) => generateSkill(sk))

  console.log(skills, experiences);
  
}

function generateSkill(skill) {
  const skillInput = document.createElement('input');
  skillInput.type = 'range';
  skillInput.min = 0;
  skillInput.max = 100;
  skillInput.disabled = true;
  skillInput.value = skill.level;

  const titlePar = document.createElement('p');
  titlePar.textContent = skill.title;
  skillsSection.append(titlePar, skillInput)
}

function generateExperience(data) {
  const workTimePar = document.createElement('p');
  workTimePar.textContent = `${data.startYear} - ${data.finishYear}`;
  workTimePar.classList.add('green', 'font-size');

  const positionPar = document.createElement('p');
  positionPar.textContent = data.position;

  const companyNamePar = document.createElement('p');
  companyNamePar.textContent = data.companyName;

  const descriptionPar = document.createElement('p');
  descriptionPar.textContent = data.description;

  experiencesSection.append(workTimePar, positionPar, companyNamePar, descriptionPar);
}

getData()