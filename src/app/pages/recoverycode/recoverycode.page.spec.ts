import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecoverycodePage } from './recoverycode.page';

describe('RecoverycodePage', () => {
  let component: RecoverycodePage;
  let fixture: ComponentFixture<RecoverycodePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecoverycodePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecoverycodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
