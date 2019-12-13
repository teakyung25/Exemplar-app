function matchmaker(mentors, userfields) {
  let user_ments = {};
  for (let mentor of mentors) {
      console.log(mentor)
      user_ments[mentor.username] = 0
  };
  console.log(user_ments)
  for (let index = 0; index < mentors.length; index++) {
      const mentoru = mentors[index].username;
      const mentorf = mentors[index].fields;
      for (let field of mentorf) {
          console.log(field)
          console.log(userfields)
          if (userfields.includes(field)) {
              user_ments[mentoru] += 1;
          }
      }
      
  }
  // Now we have an array of mentors and their scores
  console.log(user_ments)
  const getMax = object => {
      return Object.keys(object).filter(x => {
          return object[x] == Math.max.apply(null, Object.values(object));
     });
  };
  return getMax(user_ments)
};