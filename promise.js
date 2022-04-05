function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getStudents(resolve, reject) {
  const timer = randomIntFromInterval(1000, 2000);
  setTimeout(() => {
    resolve([
      {
        name: "John",
        cours: [1, 2, 3],
      },
      {
        name: "Jane",
        cours: [1, 3],
      },
      {
        name: "Jack",
        cours: [2],
      },
    ]);
  }, timer);
}

function getCourses(resolve, reject) {
  const timer = randomIntFromInterval(10000, 15000);
  setTimeout(() => {
    resolve([
      {
        id: 1,
        name: "Math",
      },
      {
        id: 2,
        name: "English",
      },
      {
        id: 3,
        name: "Physics",
      },
    ]);
  }, timer);
}

function mapStudentsCourses(students, courses) {
  return students.map((student) => {
    return {
      name: student.name,
      cours: courses.filter((course) => {
        return student.cours.includes(course.id);
      }),
    };
  });
}

const timer = (resolve, reject) => {
  setTimeout(() => {
    reject();
  }, 7000);
};

Promise.race([
  Promise.all([new Promise(getStudents), new Promise(getCourses)]).then(
    (results) => {
      const students = results[0];
      const courses = results[1];
      const result = mapStudentsCourses(students, courses);
      console.log(result);
    }
  ),
  new Promise(timer),
])
  .then((result) => {
    console.log("Merge OK");
  })
  .catch((error) => {
    console.log("Timeout");
  });
