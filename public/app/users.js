class node {
    constructor(node_name, location, active, mentors = null, mentees = null) {
      this.node_name = node_name;
      this.location = location;
      this.active = active;
      this.mentors = [];
      if (mentors != null) {
        this.mentors = mentors;
      }
     this.mentees = [];
      if (mentees != null) {
        this.mentees = mentees;
      }
    }
  
    add_mentee(mentee){
      if(!(this.mentees.includes(mentee))){
        this.mentees.push(mentee);
      }
    }
    add_mentor(mentor){
      if(!(this.mentors.includes(mentor))){
        this.mentors.push(mentor);
      }
    }
    matching_mentee_with_mentor(node, mentee){
      mentorMatch(node, mentee);
      return mentee.possible_mentors;
    }
    remove_mentee(mentee){
      this.mentees.delete(mentee);
    }
    remove_mentor(mentor){
      this.mentors.delete(mentor);
    }
    to_s(){
      var s = [];
      (this.mentors).forEach(function(e){
        s.push(e);
      });
      (this.mentees).forEach(function(e){
        s.push(e);
      });
      return s;
    }
    // reproduce_class(){
    //   stringy_boi = "${this.node_name}, ${this.location}, ${this.active}"
    //   // for each mentor in mentors:
    //   //   stringy_boi += mentor.reproduce_class
    // }
  }
  
  class User{
    constructor(first_name, last_name, email, username, hashed_pass, is_active){
      this.first_name = first_name;
      this.last_name = last_name;
      this.email = email;
      this.username = username;
      this.hashed_pass = hashed_pass;
      this.is_active = is_active; 
    }
    to_s(){
      return "Name: ${this.firstname} Email: #{this.email}"
    }
  }
  
  class Mentee extends User{
      constructor(first_name, last_name, email, username, hashed_pass, is_active, age, hobbies = null,interests = null){
        super(first_name, last_name, email, username, hashed_pass, is_active);
        this.age = age;
        this.fullname = first_name + last_name;
        this.possible_mentors = [];
        this.true_mentors = [];
        this.interests = [];
        if(interests != null){
          this.interests = interests;
        }    
  
        this.hobbies = [];
        if(hobbies != null){
          this.hobbies = hobbies;
        }
        this.mentors_of_student = [];
      }
      select_mentor(mentor){
        this.true_mentors.append(mentor);
      }
    }
    class Mentor extends User{
      constructor(first_name, last_name, email, username, hashed_pass, is_active, field, workbio, interests = null){
        super(first_name, last_name, email, username, hashed_pass, is_active)
        this.field = field;
        this.interests = [];
        if( interests != null){
          this.interests = interests;
        }
        this.workbio = workbio;
        this.mentored_students = [];
        this.fullname = first_name + " " + last_name;
      }
    }
  
  // function node()
  const MVHS = new node("Mountain Vista High School", "Highlands Ranch", true);
  const PADJEN = new Mentor('Padjen', 'Olson', 'Padjen@padjen.padjen', "padjen12", '12312!@4S3^@#%', true, ['Computer Science'], 'I graduated from xyz with a masters in Computer Science. I soon after got a job in a lab.');
  const BADJEN = new Mentor('Badjen', 'Bocho', 'Padjen@padjen.padjen', "padjen12", '$@#^22!@4S3*^*@', true, ['Computer Science','Music'], 'I graduated from xyz with a masters in Computer Science. I soon after got a job in a lab.');
  const TK = new Mentee("Taekyung", "Kim", "kimt2@s.dcsdk12.org", "teakyung25", "a;slkdfja;sklvna", true, 5, ['Computer Science'], ['coding', 'potatoes', 'sleep']);
  MVHS.add_mentee(TK);
  MVHS.add_mentor(PADJEN);
  MVHS.add_mentor(BADJEN);
  var tkmentors = MVHS.matching_mentee_with_mentor(MVHS, TK);
  console.log(tkmentors);
  console.log(MVHS.to_s());

  
  
  