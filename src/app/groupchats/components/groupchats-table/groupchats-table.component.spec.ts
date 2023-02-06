import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupchatsTableComponent } from './groupchats-table.component';

describe('GroupchatsTableComponent', () => {
  let component: GroupchatsTableComponent;
  let fixture: ComponentFixture<GroupchatsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupchatsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupchatsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
