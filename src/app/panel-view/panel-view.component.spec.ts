import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelViewComponent } from './panel-view.component';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';

describe('PanelViewComponent', () => {
  let component: PanelViewComponent;
  let fixture: ComponentFixture<PanelViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelViewComponent, CommonModule, TabViewModule, ButtonModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PanelViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
