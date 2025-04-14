import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-course-selection',
  templateUrl: './course-selection.component.html',
  styleUrls: ['./course-selection.component.css']
})
export class CourseSelectionComponent {
  public static Route = {
    path: 'git-together/course-selection',
    title: 'Select Course',
    component: CourseSelectionComponent
  };

  selectedCourse: string = '';

  availableCourses = [
    { code: 'COMP50', name: 'First-Year Seminar: Everyday Computing' },
    { code: 'COMP60', name: 'First-Year Seminar: Robotics with LEGO®' },
    {
      code: 'COMP65',
      name: 'First-Year Seminar: Folding, from Paper to Proteins'
    },
    { code: 'COMP80', name: 'First-Year Seminar: Enabling Technology' },
    { code: 'COMP85', name: 'First-Year Seminar: The Business of Games' },
    { code: 'COMP89', name: 'First-Year Seminar: Special Topics' },
    { code: 'COMP101', name: 'Fluency in Information Technology' },
    { code: 'COMP110', name: 'Introduction to Programming and Data Science' },
    { code: 'COMP116', name: 'Introduction to Scientific Programming' },
    {
      code: 'COMP126',
      name: 'Practical Web Design and Development for Everyone'
    },
    { code: 'COMP180', name: 'Enabling Technologies' },
    { code: 'COMP185', name: 'Serious Games' },
    { code: 'COMP190', name: 'Topics in Computing' },
    { code: 'COMP210', name: 'Data Structures and Analysis' },
    { code: 'COMP211', name: 'Systems Fundamentals' },
    { code: 'COMP222', name: 'ACM Programming Competition Practice' },
    { code: 'COMP227', name: 'Effective Peer Teaching in Computer Science' },
    { code: 'COMP283', name: 'Discrete Structures' },
    { code: 'COMP290', name: 'Special Topics in Computer Science' },
    { code: 'COMP293', name: 'Internship in Computer Science' },
    { code: 'COMP301', name: 'Foundations of Programming' },
    { code: 'COMP311', name: 'Computer Organization' },
    { code: 'COMP325', name: 'How to Build a Software Startup' },
    { code: 'COMP380', name: 'Technology, Ethics, & Culture' },
    { code: 'COMP388', name: 'Advanced Cyberculture Studies' },
    { code: 'COMP390', name: 'Computer Science Elective Topics' },
    { code: 'COMP393', name: 'Software Engineering Practicum' },
    { code: 'COMP401', name: 'Foundation of Programming' },
    { code: 'COMP410', name: 'Data Structures' },
    { code: 'COMP411', name: 'Computer Organization' },
    { code: 'COMP421', name: 'Files and Databases' },
    { code: 'COMP426', name: 'Modern Web Programming' },
    { code: 'COMP431', name: 'Internet Services and Protocols' },
    { code: 'COMP433', name: 'Mobile Computing Systems' },
    { code: 'COMP435', name: 'Computer Security Concepts' },
    { code: 'COMP447', name: 'Quantum Computing' },
    { code: 'COMP455', name: 'Models of Languages and Computation' },
    { code: 'COMP475', name: '2D Computer Graphics' },
    { code: 'COMP486', name: 'Applications of Natural Language Processing' },
    { code: 'COMP487', name: 'Information Retrieval' },
    { code: 'COMP488', name: 'Data Science in the Business World' },
    { code: 'COMP495', name: 'Mentored Research in Computer Science' },
    { code: 'COMP496', name: 'Independent Study in Computer Science' },
    { code: 'COMP520', name: 'Compilers' },
    { code: 'COMP523', name: 'Software Engineering Laboratory' },
    { code: 'COMP524', name: 'Programming Language Concepts' },
    { code: 'COMP530', name: 'Operating Systems' },
    { code: 'COMP533', name: 'Distributed Systems' },
    { code: 'COMP535', name: 'Introduction to Computer Security' },
    { code: 'COMP537', name: 'Cryptography' },
    { code: 'COMP541', name: 'Digital Logic and Computer Design' },
    { code: 'COMP545', name: 'Programming Intelligent Physical Systems' },
    { code: 'COMP550', name: 'Algorithms and Analysis' },
    { code: 'COMP555', name: 'Bioalgorithms' },
    { code: 'COMP560', name: 'Artificial Intelligence' },
    { code: 'COMP562', name: 'Introduction to Machine Learning' },
    { code: 'COMP572', name: 'Computational Photography' },
    { code: 'COMP575', name: 'Introduction to Computer Graphics' },
    { code: 'COMP576', name: 'Mathematics for Image Computing' },
    { code: 'COMP580', name: 'Enabling Technologies' },
    { code: 'COMP581', name: 'Introduction to Robotics' },
    { code: 'COMP585', name: 'Serious Games' },
    { code: 'COMP586', name: 'Natural Language Processing' },
    { code: 'COMP590', name: 'Topics in Computer Science' }
  ];

  constructor(
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  navigateToGitTogether() {
    this.router.navigate(['/coworking/git-together']);
  }

  viewMatches() {
    this.router.navigate([
      '/coworking/git-together/matches/:course',
      { course: this.selectedCourse }
    ]);
  }
}
