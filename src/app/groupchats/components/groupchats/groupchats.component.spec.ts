import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupchatsComponent } from './groupchats.component';

describe('GroupchatsComponent', () => {
  let component: GroupchatsComponent;
  let fixture: ComponentFixture<GroupchatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupchatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupchatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
