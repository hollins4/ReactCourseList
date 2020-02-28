import React from 'react';
import style from './css/style.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courseName: '',
      courseGrade: '',
      couseID: '',
      courses: [],
      courseNameError: '',
      courseGradeError: '',
      editMode: -1
    };
  }

  courseNameChange(event) {
    this.setState({courseName: event.target.value });
  }

  courseGradeChange(event) {
    this.setState({courseGrade: event.target.value });
  }

  addCourse(event) {
    event.preventDefault();
    
    if (/^\s*$/.test(this.state.courseName) && /^\s*$/.test(this.state.courseGrade)) {
        this.setState({courseNameError: "Must provide a course name"});
        this.setState({courseGradeError: "Must provide a course grade" });
    } else if (/^\s*$/.test(this.state.courseName)) {
        this.setState({ courseNameError: "Must provide a course name" });
        this.setState({ courseGradeError: "" }); 
    } else if (/^\s*$/.test(this.state.courseGrade)) {
        this.setState({ courseNameError: "" });
        this.setState({ courseGradeError: "Must provide a course grade" });
    } else if (isNaN(this.state.courseGrade) || this.state.courseGrade < 0 || this.state.courseGrade > 100) {
        this.setState({ courseNameError: "" });
        this.setState({ courseGradeError: "Course grade must be a number between 0 - 100" });
    }
    else {
        
        let courseArray = this.state.courses;
        let tempCourseID = Math.random() * 100;
        courseArray.push({ courseName: this.state.courseName, 
                           courseGrade: this.state.courseGrade,
                           courseID: tempCourseID });
        this.setState({ courses: courseArray, courseName: '', courseGrade: '' });
        this.setState({ courseNameError: "", courseGradeError: ""});
    }
  }

  editCourse(courseID) {
    let courseLocation = this.state.courses.map(course => {return course.courseID }).indexOf(courseID);
    let editCourseName = this.state.courses[courseLocation].courseName;
    let editCourseGrade = this.state.courses[courseLocation].courseGrade;
    
    this.setState({ courseName: editCourseName});
    this.setState({ courseGrade: editCourseGrade });
    this.setState({ editMode: courseLocation }); 
  }

  updateCourse(event) {
    event.preventDefault();
    let courseLocation = this.state.editMode;
    
    if (/^\s*$/.test(this.state.courseName) && /^\s*$/.test(this.state.courseGrade)) {
      this.setState({ courseNameError: "Must provide a course name" });
      this.setState({ courseGradeError: "Must provide a course grade" });
      
    } else if (/^\s*$/.test(this.state.courseName)) {
      this.setState({ courseNameError: "Must provide a course name" });
      this.setState({ courseGradeError: "" });
    } else if (/^\s*$/.test(this.state.courseGrade)) {
      this.setState({ courseNameError: "" });
      this.setState({ courseGradeError: "Must provide a course grade" });
    } else if (isNaN(this.state.courseGrade) || this.state.courseGrade < 0 || this.state.courseGrade > 100) {
      this.setState({ courseNameError: "" });
      this.setState({ courseGradeError: "Course grade must be a number between 0 - 100" });
    }
    else {

      let courseArray = this.state.courses;

      courseArray[courseLocation].courseName = this.state.courseName;
      courseArray[courseLocation].courseGrade = this.state.courseGrade;
      
      this.setState({ courses: courseArray, courseName: '', courseGrade: '' });
      this.setState({ courseNameError: "", courseGradeError: "", editMode: -1 });
    }
  }

  deleteCourse(courseID) {
    this.setState({ courseName: '', courseGrade: '', editMode: -1 });
    let tempCourseArray = this.state.courses;

    let removeDeletedCourse = tempCourseArray.filter((course) => {
      return course.courseID !== courseID;
    });
    this.setState({courses: removeDeletedCourse});
  }

  render() {
    return (
      <FormPresentation 
        courseName={this.state.courseName}
        courseGrade={this.state.courseGrade}
        courses={this.state.courses}
        courseNameError={this.state.courseNameError}
        courseGradeError={this.state.courseGradeError}
        courseNameChange={this.courseNameChange.bind(this)}
        courseGradeChange={this.courseGradeChange.bind(this)} 
        addCourse={this.addCourse.bind(this)}
        deleteCourse={this.deleteCourse.bind(this)}
        editCourse={this.editCourse.bind(this)}
        updateCourse={this.updateCourse.bind(this)}
        editMode={this.state.editMode}
      />
    );
  }
}

function Highest(courses) {
    
  let gradeList = courses.courses.map(course => {return course.courseGrade} );
  let high = Math.max(...gradeList);
  
  if (high >= 0 && high <= 100)
    return (high);
  else  
    return ("");
}

function Lowest(courses) {
  let gradeList = courses.courses.map(course => { return course.courseGrade });
  let low = Math.min(...gradeList);

  if (low >= 0 && low <= 100)
    return (low);
  else
    return ("");
}

function Average(courses) {
  let sum = 0;
  
  courses.courses.forEach(course => {
      sum += parseInt(course.courseGrade) / courses.courses.length;
  });


  if (sum !== 0)
    return (Math.ceil(sum));
  else 
    return ("");
}


class FormPresentation extends React.Component {

  render() {
    var buttonDisplay
    if (this.props.editMode === -1) {
      buttonDisplay = <input type="Button" class="green lighten-1 btn-large" value="Add Course" onClick={this.props.addCourse.bind(this)} />
    } else {
      buttonDisplay = <input type="Button" class="yellow accent-4 black-text btn-large" value="Edit Course" onClick={this.props.updateCourse.bind(this)} />
    }

    return(
      <div class="container">
        <div class="row">
        <header class="centered offset-l1">
            <h1>Grade Calculator</h1>
        </header>
        
          <fieldset class="col s11 offset-s1 l11 offset-l1 centered">
            <legend>Course Information</legend>
            <br />
            <div class="row">
              <div class="input-field col s6 col l6">
                <input type="text"  id="courseName"value={this.props.courseName} 
                    onChange={this.props.courseNameChange.bind(this)} /><br />
                <label for="courseName" >Course Name</label>
                <p class="error">{this.props.courseNameError}</p>
              </div>
              
              <div class="input-field col s6 col l6">
                <input type="text" class="validate" id="courseGrade"value={this.props.courseGrade} 
                  onChange={this.props.courseGradeChange.bind(this)} /><br />
                <label for="courseGrade">Grade</label>
                <p class="error">{this.props.courseGradeError}</p>
              </div>
            </div>
            <div class="row">
              <div class="col offset-s4 s12 offset-l5 l12">
                {buttonDisplay}
              </div>
            </div> 
          </fieldset>
        
          <h4>Analytics</h4>
          <table class="highlight striped centered">
            <thead>
              <tr>
                <th>Maximum Grade</th>
                <th>Minimum Grade</th>
                <th>Average Grade</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><Highest courses={this.props.courses} /></td>
                <td><Lowest courses={this.props.courses} /></td>
                <td><Average courses={this.props.courses} /></td>
              </tr>
            </tbody>
          </table>

        <h4>Courses</h4>
        <table class="highlight striped centered">
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Course Grade</th>
              <th>Modify Course</th>
              <th>Delete Course</th>
            </tr>
          </thead>
          <tbody>
            {this.props.courses.map(course => {
            return (<tr key={course.courseID}> 
                      <td>{course.courseName}</td>
                      <td>{course.courseGrade}</td>
                      <td><a onClick={() => this.props.editCourse(course.courseID)}>
                        <i class="material-icons medium edit">edit</i></a></td>
                      <td><a onClick={() => this.props.deleteCourse(course.courseID)}>
                        <i class="material-icons medium delete">delete</i></a></td>
                    </tr>);
          })}
          </tbody>
        </table>
        <br />
        
        </div>
      </div>
    );
  }
}

export default App;
