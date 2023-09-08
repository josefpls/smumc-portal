import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinistriesFormComponent } from './ministries-form.component';

describe('MinistriesFormComponent', () => {
  let component: MinistriesFormComponent;
  let fixture: ComponentFixture<MinistriesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinistriesFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinistriesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
