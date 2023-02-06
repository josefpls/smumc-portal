import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupchatFormComponent } from './groupchat-form.component';

describe('GroupchatFormComponent', () => {
  let component: GroupchatFormComponent;
  let fixture: ComponentFixture<GroupchatFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupchatFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupchatFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
