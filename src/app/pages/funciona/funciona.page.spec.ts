import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FuncionaPage } from './funciona.page';

describe('FuncionaPage', () => {
  let component: FuncionaPage;
  let fixture: ComponentFixture<FuncionaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuncionaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FuncionaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
