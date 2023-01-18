import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GradosPage } from './grados.page';

describe('GradosPage', () => {
  let component: GradosPage;
  let fixture: ComponentFixture<GradosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GradosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
