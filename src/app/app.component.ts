import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit{
  title = 'frontend';
  ngAfterViewInit(){
    document.addEventListener('DOMContentLoaded', function() {
      const emailIcon = document.getElementById('email') as HTMLElement;
      const emailDropdown = document.querySelector('.email-dropdown-content') as HTMLElement;
  
      function closeAllDropdowns() {
          emailDropdown.style.display = 'none';
      }
  
      emailIcon.addEventListener('click', function(event) {
          event.stopPropagation();
          closeAllDropdowns();
          emailDropdown.style.display = (emailDropdown.style.display === 'none' || emailDropdown.style.display === '') ? 'block' : 'none';
      });
  
      window.addEventListener('click', function() {
          closeAllDropdowns();
      });
  });
  }
}
