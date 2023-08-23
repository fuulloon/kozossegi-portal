import {
  combineLatest,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { MessageContact } from 'src/app/module/messages/model/message-contact.model';
import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MessagesUtilService } from '../../service/messages-util.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {
  public messageContacts$!: Observable<MessageContact[]>;
  public selectedContactId: number | null = null;
  @Output() contactSelected = new EventEmitter<number>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private messagesUtilService: MessagesUtilService
  ) {}

  ngOnInit() {
    this.messageContacts$ = combineLatest([
      this.getSelectedContactIdFromRoute(),
      this.messagesUtilService.getMessageContacts(),
    ])
    .pipe(switchMap(([_, messageContacts]) => {
      return of(messageContacts);
    }));
  }

  private getSelectedContactIdFromRoute(): Observable<Params> {
    return this.activatedRoute.params.pipe(
      tap((params) => {
        if (params['id']) {
          this.selectedContactId = +params['id'];
        }
      })
    )
  }

  public selectContact(userId: number) {
    this.selectedContactId = userId;
    this.contactSelected.emit(userId);
  }

}
