import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ComocodigoPage } from './comocodigo.page';

describe('ComocodigoPage', () => {
  let component: ComocodigoPage;
  let fixture: ComponentFixture<ComocodigoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComocodigoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ComocodigoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
